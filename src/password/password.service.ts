import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
    async comparePasswords(candidatePassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(candidatePassword, hashedPassword);
    }
}
