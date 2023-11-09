import { Injectable } from "@nestjs/common";
import { UserId } from "../../entities";
import { UserRepository } from "../../repositories";
import { UserUseCasesOutput, PlainUserUseCasesOutput } from "./user.useCases.type";
import { UserModel } from "library-api/src/models";

@Injectable()
export class UserUseCases {
    constructor(private readonly userRepository: UserRepository) {}

    /**
     * Get all plain users
     * @returns Array of plain users
     */
    public async getAllPlain(): Promise<PlainUserUseCasesOutput[]> {
        return this.userRepository.getAllPlain();
    }

    /**
     * Get an user by their ID
     * @param id User's ID
     * @returns User if found
     * @throws 404: user with this ID was not found
     */
    public async getById(id: UserId): Promise<PlainUserUseCasesOutput> {
        return this.userRepository.getById(id);
    }

    public async deleteUser(id: UserId): Promise<void> {
        return this.userRepository.deleteUser(id);
    }
}