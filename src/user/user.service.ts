// user.service.ts
import { Injectable } from '@nestjs/common';
import {ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import Redis from 'ioredis';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  private readonly redisClient: Redis;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    this.redisClient = new Redis();
  }

  async flushRedis(): Promise<void> {
    try {
      await this.redisClient.flushall();
      console.log('Redis data flushed successfully.');
    } catch (error) {
      console.error('Error flushing Redis data:', error);
    }
  }

  async register(user: User): Promise<User> {
    const existingUser = await this.userRepository.findOne({ where: { email: user.email } });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = this.userRepository.create({ ...user, password: hashedPassword });
    this.flushRedis();
    return this.userRepository.save(newUser);
  }


  async login(email: string, password: string): Promise<{ accessToken: string }> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email: user.email, sub: user.id };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    return {accessToken: accessToken}
  }


  private async fetchAndStoreData(): Promise<User[]> {
    const users: any[] = await this.userRepository.find({
        order: {
            positionId: 'ASC'
        }
    });
    const parentUsers = users.filter(user => !user.parentId);

    for (const user of parentUsers) {
        await this.redisClient.set(`user:${user.id}`, JSON.stringify(user));
    }

    await this.redisClient.set('users:hierarchy', JSON.stringify(parentUsers));

    return parentUsers;
}
  private getChildUserByPosition(parentPositionId: number, users: User[]): any[] {
    const children = users.filter(user => user.positionId > parentPositionId && user.positionId < parentPositionId + 100);
    return children.map(child => ({
      id: child.id,
      name: child.name,
      positionId: child.positionId,
      positionName: child.positionName,
      childUser: this.getChildUserByPosition(child.positionId, users),
    }));
  }


  async getAllUsersWithHierarchyByPosition(): Promise<User[]> {
    const cachedResult = await this.redisClient.get('users:hierarchy');

    if (cachedResult) {
        console.log('sending data from cache');
        return JSON.parse(cachedResult);
    } else {
        const result: any = await this.fetchAndStoreData();
        return result;
    }
}

  private formatUser(user: User): any {
    const formattedUser: any = { id: user.id, name: user.name, positionId: user.positionId,email:user.email, positionName: user.positionName };
    if (user.children && user.children.length > 0) {
      formattedUser.children = user.children.map(child => this.formatUser(child));
    }
    return formattedUser;
  }


  async getAllUsersWithHierarchyPagination(page: number = 1, pageSize: number = 10): Promise<User[]> {
    let users: any[] = await this.userRepository.find();
  
    users = users.filter(user => !user.parentId);
  
    for (const user of users) {
      await this.fetchChildren(user);
    }
  
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
  
    const paginatedUsers = users.slice(startIndex, endIndex);
  
    return paginatedUsers;
  }
  



  async getAllUsersPositionOneDown(page: number, pageSize: number): Promise<{ parent: any, childUser: any[] }[]> {
    const users = await this.userRepository.find({
      order: { positionId: 'ASC' },
      relations: ['children'],
      take: pageSize,
      skip: (page - 1) * pageSize,
    });

    const result = users.map(parent => ({
      parent: this.formatUser(parent),
      childUser: this.getChildUserByPosition(parent.positionId, users),
    }));

    return result;
  }



  async getUserByPositionId(positionId: number): Promise<User[]> {
    const nextPositionId = +positionId + 1;

    let users = await this.userRepository.find({ where: { positionId: nextPositionId } });

    users = users.filter(user => !user.parentId);
    for (const user of users) {
      await this.fetchChildren(user);
    }

    return users;
  }

  private async fetchChildren(user: User): Promise<void> {
    user.children = await this.userRepository.find({ where: { parentId: user.id } });

    for (const child of user.children) {
      await this.fetchChildren(child);
    }
  }
  
}
