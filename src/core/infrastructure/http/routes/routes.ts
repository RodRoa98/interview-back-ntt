import { FastifyInstance } from "fastify";
import { AuthController } from "../../../../auth/interfaces/controllers/auth.controller";
import { UserController } from "../../../../users/interfaces/controllers/user.controller";

export function registerRoutes(fastify: FastifyInstance) {
    fastify.register(AuthController, { prefix: '/api/auth' });
    fastify.register(UserController, { prefix: '/api/users' });
}