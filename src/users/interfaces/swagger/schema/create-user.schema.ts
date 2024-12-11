import { errorSchema } from "../../../../core/interfaces/swagger/schema";

export const createUserSchema = {
    security: [{ bearerAuth: [] }],
    tags: ['Auth'],
    description: 'Login',
    params: {},
    body: {
        type: 'object',
        properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string' },
            name: { type: 'string' },
            phone: { type: 'string' },
        },
        required: ['email', 'password', 'name']
    },
    response: {
        200: {
            type: 'object',
            properties: {
                email: { type: 'string', format: 'email' },
                name: { type: 'string' },
                phone: { type: 'string' },
            },
            required: ['email', 'name']
        },
        400: errorSchema,
        500: errorSchema,
    },
    headers: {}
}