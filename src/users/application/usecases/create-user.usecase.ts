import { UserDTO } from "../../../core/domain/dtos";
import { BcryptService } from "../../../core/infrastructure/services";
import { UserRepository } from "../ports/repositories/user.repository";

export class CreateUserUseCaseImpl {

    constructor(
        private userRepository: UserRepository, 
        private bcryptService: BcryptService
    ) {}

    async handler(body: UserDTO) {
        const { password, ...userWOPassword } = body;
        const userToCreate = { ...body, password: await this.bcryptService.encrypt(password) };

        await this.userRepository.create(userToCreate);

        return userWOPassword;
    }
}