import { Injectable } from "@nestjs/common";
import { UserBookId } from "library-api/src/entities";
import { UserBookRepository } from "library-api/src/repositories";
import { PlainUserBookUseCasesOutput } from "library-api/src/useCases/usersBooks/userBook.useCases.type";
import { PlainUserBookModel } from "library-api/src/models";

@Injectable()
export class UserBookUseCases {
    constructor(private readonly userBookRepository: UserBookRepository) {}

    /**
     * Get all plain usersBooks
     * @returns Array of plain usersBooks
     */
    public async getAllPlain(): Promise<PlainUserBookUseCasesOutput[]> {
        return this.userBookRepository.getAllPlain();
    }
}