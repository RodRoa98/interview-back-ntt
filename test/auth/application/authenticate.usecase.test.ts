import { AuthenticateUseCaseImpl } from '../../../src/auth/application/usecases/authenticate.usecase';

describe('Authenticate UseCase Test Suite', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('It should return a valid response', async () => {
        const userResponse = {
            email: 'roasgo@hotmail.com', password: 'jeje'
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

        const authUseCase = new AuthenticateUseCaseImpl(userRepo, bcryptServiceMock);
        const response = await authUseCase.handler({ email: 'roasgo@hotmail.com', password: 'jeje' });

        expect(response).toBe(userResponse);
    })

    test('It should throw Auth error', async () => {
        const userResponse = 'Auth error.';
        const bcryptServiceMock = {
            compare: jest.fn(async () => true),
            encrypt: jest.fn(async () => ''),
        };

        const userRepo: any = {
            findBy: jest.fn(async () => {
                return userResponse
            }),
            exists: jest.fn(async () => false),
            create: jest.fn(),
            findAll: jest.fn(),
        };

        const authUseCase = new AuthenticateUseCaseImpl(userRepo, bcryptServiceMock);

        try {
            await authUseCase.handler({ email: 'roasgo@hotmail.com', password: 'jeje' });
        } catch (error) {
            expect((error as Error).message).toBe(userResponse);
        }
    })

    test('It should throw Password incorrect error', async () => {
        const userResponse = 'Password incorrect.';
        const bcryptServiceMock = {
            compare: jest.fn(async () => false),
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

        const authUseCase = new AuthenticateUseCaseImpl(userRepo, bcryptServiceMock);
        try {
            await authUseCase.handler({ email: 'roasgo@hotmail.com', password: 'jeje' });
        } catch (error) {
            expect((error as Error).message).toBe(userResponse);
        }
    })
})