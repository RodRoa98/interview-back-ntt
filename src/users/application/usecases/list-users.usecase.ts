import { UserRepository } from "../ports/repositories/user.repository";

export class ListAllUsersUseCaseImpl {

    constructor(
        private userRepository: UserRepository
    ) {}

    async handler() {
        return await this.userRepository.findAll();
    }
}