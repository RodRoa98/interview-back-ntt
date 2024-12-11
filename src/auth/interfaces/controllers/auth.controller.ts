import 'dotenv/config';
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { loginSchema } from "../swagger/schema";
import { LoginDTO } from "../../domain/dto";
import { AuthenticateUseCaseImpl } from "../../application/usecases/authenticate.usecase";
import { UserModel } from "../../../core/infrastructure/database/models";
import { UserRepository } from "../../../users/application/ports/repositories";
import { BcryptService } from "../../../core/infrastructure/services";

export function AuthController(fastify: FastifyInstance) {
    fastify
        .post('/login', { schema: loginSchema },
            async (request: FastifyRequest, reply: FastifyReply) => {
                try {
                    const body = request.body as LoginDTO;
                    const userRepository = new UserRepository(UserModel);
                    const bcryptService = new BcryptService();
                    const authenticateUseCase = new AuthenticateUseCaseImpl(userRepository, bcryptService);

                    const payload = await authenticateUseCase.handler(body);

                    const accessToken = await reply.jwtSign({ payload });
                    const refreshToken = await reply.jwtSign({ payload }, { expiresIn: process.env.JWT_EXPIRATION });

                    reply.status(200).send({ accessToken, refreshToken });
                } catch (error) {
                    reply.status(500).send({ 
                        error: (error as Error).name, message: (error as Error).message 
                    });
                }
            }
        )
}