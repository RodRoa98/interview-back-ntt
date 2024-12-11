import { mongooseConnect } from "./core/infrastructure/database/connection";
import { FastifyServer } from "./core/infrastructure/http/servers/fastify.server";

const start = async () => {
    const fastifyServer = new FastifyServer();
    await mongooseConnect();
    await fastifyServer.start(+(process.env.PORT ?? '3000'));
}

start();