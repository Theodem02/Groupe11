/* eslint-disable import/no-cycle */
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { BookGenre } from './BookGenre';
import { Author } from './Author';
import { User } from './User';
import { UserBook } from './UserBook';

export type BookId = string & { __brand: 'Book' };

@Entity('Books')
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: BookId;

  @Column()
  name: string;

  @Column({ type: 'date' })
  writtenOn: Date;

  @Column()
  authorId: string;

  @ManyToOne(() => Author, (author) => author.books, { onDelete: 'CASCADE' })
  author: Author;

  @OneToMany(() => BookGenre, (bookGenre) => bookGenre.book)
  bookGenres: BookGenre[];

  @OneToMany(() => UserBook, (userbook) => userbook.book)
  book: User[];
}
