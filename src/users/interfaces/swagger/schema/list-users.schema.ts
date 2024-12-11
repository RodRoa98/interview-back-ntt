import { errorSchema } from "../../../../core/interfaces/swagger/schema";

export const listUsersSchema = {
    security: [{ bearerAuth: [] }],
    tags: ['Auth'],
    description: 'Login',
    params: {},
    response: {
        200: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    email: { type: 'string', format: 'email' },
                    name: { type: 'string' },
                    phone: { type: 'string' },
                },
            }
        },
        400: errorSchema,
        500: errorSchema,
    },
    headers: {}
}