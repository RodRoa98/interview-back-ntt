import { errorSchema } from "../../../../core/interfaces/swagger/schema";

export const loginSchema = {
    security: [{ bearerAuth: [] }],
    tags: ['Auth'],
    description: 'Login',
    params: {},
    body: {
        type: 'object',
        properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string' },
        },
        required: ['email', 'password']
    },
    response: {
        200: {

        },
        400: errorSchema,
        500: errorSchema,
    },
    headers: {}
}