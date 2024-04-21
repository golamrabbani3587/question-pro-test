import { Controller, Get,Query, ParseIntPipe,Post, Body,UseGuards } from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from './user.entity';
import { JwtAuthGuard } from '../user/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post('register')
  async register(@Body() user: User): Promise<User> {
    return this.usersService.register(user);
  }

  @Post('login')
  async login(@Body('email') email: string, @Body('password') password: string): Promise<{ accessToken: any }> {
    return this.usersService.login(email, password);
  }
  @Get('by-position')
  @UseGuards(JwtAuthGuard)
  async getUsersByPositionId(@Query('positionId') positionIdParam: number): Promise<User[]> {
    return this.usersService.getUserByPositionId(positionIdParam);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllUsersWithHierarchy() {
    return this.usersService.getAllUsersWithHierarchyByPosition();
  }

  @Get('pagination')
  @UseGuards(JwtAuthGuard)
  async getAllUsersWithHierarchyPagination(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('pageSize', ParseIntPipe) pageSize: number = 10,
  ) {
    return this.usersService.getAllUsersWithHierarchyPagination(page, pageSize);
  }
}
