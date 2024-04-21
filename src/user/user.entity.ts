import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  positionId: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  positionName: string;

  @Column({ nullable: true })
  parentId: number;

  @ManyToOne(type => User, user => user.children)
  @JoinColumn({ name: 'parentId' })
  parent: User;

  @OneToMany(type => User, user => user.parent)
  children: User[];
}
