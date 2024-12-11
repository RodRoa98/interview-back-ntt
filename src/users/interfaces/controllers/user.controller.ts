import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { createUserSchema, listUsersSchema } from "../swagger/schema";
import { CreateUserUseCaseImpl } from "../../application/usecases/create-user.usecase";
import { ListAllUsersUseCaseImpl } from "../../application/usecases/list-users.usecase";
import { BcryptService } from "../../../core/infrastructure/services";
import { UserRepository } from "../../application/ports/repositories/user.repository";
import { UserModel } from "../../../core/infrastructure/database/models";
import { UserDTO } from "../../../core/domain/dtos";
import { verifyToken } from "../../../core/infrastructure/http/middleware";

export function UserController(fastify: FastifyInstance) {
    fastify
        .post('/', { schema: createUserSchema },
            async (request: FastifyRequest, reply: FastifyReply) => {
                try {
                    const body = request.body as UserDTO;
                    const userRepository = new UserRepository(UserModel);
                    const bcryptService = new BcryptService();
                    const createUserUseCase = new CreateUserUseCaseImpl(userRepository, bcryptService);

                    const response = await createUserUseCase.handler(body);

                    reply.status(200).send(response);
                } catch (error) {
                    reply.status(500).send({ 
                        error: (error as Error).name, message: (error as Error).message 
                    });
                }
            }
        )

    fastify
        .get('/', { schema: listUsersSchema, preHandler: verifyToken },
            async (request: FastifyRequest, reply: FastifyReply) => {
                try {
                    const userRepository = new UserRepository(UserModel);
                    const listAllUsersUseCase = new ListAllUsersUseCaseImpl(userRepository);

                    const response = await listAllUsersUseCase.handler();

                    reply.status(200).send(response);
                } catch (error) {
                    reply.status(500).send({ 
                        error: (error as Error).name, message: (error as Error).message 
                    });
                }
            }
        )
}