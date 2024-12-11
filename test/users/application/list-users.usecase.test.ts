import { ListAllUsersUseCaseImpl } from '../../../src/users/application/usecases/list-users.usecase';

describe('Create user UseCase Test Suite', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('It should return a valid response', async () => {
        const userResponse = [
            {
                email: 'roasgo@hotmail.com',
                name: 'Gonzalo Rodrigo Roa Castillo'
            }
        ];

        const userRepo: any = {
            findBy: jest.fn(async () => {
                return userResponse
            }),
            exists: jest.fn(async () => true),
            create: jest.fn(),
            findAll: jest.fn(async () => userResponse),
        };

        const authUseCase = new ListAllUsersUseCaseImpl(userRepo);
        const response = await authUseCase.handler();

        expect(response).toStrictEqual(userResponse);
    })
})