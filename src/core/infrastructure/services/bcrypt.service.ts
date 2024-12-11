import 'dotenv/config';
import bcrypt from 'bcrypt';

export class BcryptService {
    async encrypt(text: string) {
        return bcrypt.hash(text, +(process.env.BCRYPT_SALT ?? 10));
    }

    async compare(data: string, encrypt: string) {
        return bcrypt.compare(data, encrypt);
    }
}