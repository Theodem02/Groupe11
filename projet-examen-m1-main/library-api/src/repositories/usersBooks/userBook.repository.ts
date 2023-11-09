import { Injectable } from "@nestjs/common";
import { NotFoundError } from "library-api/src/common/errors";
import { UserBook, UserBookId } from "library-api/src/entities";
import { UserBookRepositoryOutput, PlainUserBookRepositoryOutput } from "library-api/src/repositories/usersBooks/userBook.repository.type";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class UserBookRepository extends Repository<UserBook> {
    constructor(public readonly dataSource: DataSource) {
        super(UserBook, dataSource.createEntityManager());
    }


    public async getAllPlain(): Promise<PlainUserBookRepositoryOutput[]> {
        const usersBooks = await this.find({
            relations: { user: true, book: true },
        });
    
        return usersBooks.map(userBook => ({
            id: userBook.id,
            user: {
                id: userBook.user.id,
                firstName: userBook.user.firstName,
                lastName: userBook.user.lastName,
            },
            book: {
                id: userBook.book.id,
                name: userBook.book.name,
                authorId: userBook.book.authorId,
                writtenOn: userBook.book.writtenOn,
                author: userBook.book.author,
                genres: userBook.book.bookGenres ? userBook.book.bookGenres.map(genre => genre.id) : [],
            },
        }));
    } 
    
}
