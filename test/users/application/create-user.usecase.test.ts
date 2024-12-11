import { CreateUserUseCaseImpl } from '../../../src/users/application/usecases/create-user.usecase';

describe('Create user UseCase Test Suite', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('It should return a valid response', async () => {
        const userResponse = {
            email: 'roasgo@hotmail.com',
            name: 'Gonzalo Rodrigo Roa Castillo'
        }
        const bcryptServiceMock = {
            compare: jest.fn(async () => true),
            encrypt: jest.fn(async () => ''),
        };

        const userRepo: any = {
            findBy: jest.fn(async () => {
                return userResponse
            }),
            exists: jest.fn(async () => true),
            create: jest.fn(),
            findAll: jest.fn(),
        };

        const authUseCase = new CreateUserUseCaseImpl(userRepo, bcryptServiceMock);
        const response = await authUseCase.handler(
            { email: 'roasgo@hotmail.com', password: 'jeje', name: 'Gonzalo Rodrigo Roa Castillo' }
        );

        expect(response).toStrictEqual(userResponse);
    })
})