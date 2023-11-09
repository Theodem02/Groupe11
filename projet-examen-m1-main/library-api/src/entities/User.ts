import { BaseEntity, Column, Entity, OneToMany, ManyToMany, JoinTable, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from './Book';
import { UserBook } from './UserBook';

export type UserId = string & { __brand: 'User' };

@Entity('Users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: UserId;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToMany(() => UserBook, (userbook) => userbook.user)
  user: UserBook[];
}
