import { FastifyReply, FastifyRequest } from "fastify";

export async function verifyToken(request: FastifyRequest, reply: FastifyReply) {
    try {
        await request.jwtVerify();
    } catch (error) {
        reply.status(401).send({ error: 'Not Authorized', message: 'Unauthorized' })
    }
}