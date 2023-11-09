import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { User } from './User';
import { Book } from './Book';

export type UserBookId = string & { __brand: 'UserBook' };

@Entity('UserBooks')
export class UserBook extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: UserBookId;

    @Column()
    userId: string;

    @Column()
    bookId: string;

    @ManyToOne(() => User, (user) => user.user, { onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(() => Book, (book) => book.book, { onDelete: 'CASCADE' })
    book: Book;

}