import 'dotenv/config';
import Fastify, { FastifyInstance } from 'fastify';
import fastifyJwt from '@fastify/jwt';
import fastifySwagger from '@fastify/swagger';
import { registerRoutes } from '../routes';

export class FastifyServer {
    private app: FastifyInstance;

    constructor() {
        this.app = Fastify();
        this.setPlugins();
        this.setMiddlewares();
        this.setRoutes();
    }

    public start(port: number) {
        try {
            this.app.listen({ port });
            console.log(`Server running on port: ${port}`);
        } catch (error) {
            console.error('Error starting server', error);
        }
    }

    private setPlugins() {
        this.app.register(fastifySwagger, {
            openapi: {
                openapi: '3.0.0',
                info: {
                    title: 'Quest',
                    description: 'Technical interview',
                    version: '0.1.0'
                },
                servers: [ { url: 'http://localhost:3000' }],
                components: {
                    securitySchemes: {
                        bearerAuth: { type: 'http', scheme: 'Bearer', bearerFormat: 'JWT' }
                    }
                }
            }
        });
        this.app.register(fastifyJwt, { secret: process.env.JWT_SECRET ?? 'supersecreto' });
    }

    private setRoutes() {
        registerRoutes(this.app);
    }

    private setMiddlewares() {

    }
}