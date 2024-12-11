import { BcryptService } from "../../../core/infrastructure/services";
import { UserRepository } from "../../../users/application/ports/repositories";
import { LoginDTO } from "../../domain/dto";

export class AuthenticateUseCaseImpl {

    constructor(
        private userRepository: UserRepository, 
        private bcryptService: BcryptService
    ) {}

    async handler(body: LoginDTO) {
        const { password, email } = body;
        const exists = await this.userRepository.exists({ email });
        if (!exists) {
            throw new Error('Auth error.');
        }

        const user = await this.userRepository.findBy({ email });
        
        const isPasswordCorrect = await this.bcryptService.compare(password, user!.password);
        if (!isPasswordCorrect) {
            throw new Error('Password incorrect.');
        }

        return user;
    }
}