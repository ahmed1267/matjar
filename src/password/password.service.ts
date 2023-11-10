import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
    static async comparePasswords(candidatePassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(candidatePassword, hashedPassword);
    }
}
