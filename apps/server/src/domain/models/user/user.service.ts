import crypto from 'crypto';
import {Injectable} from '@nestjs/common';

@Injectable()
export class UserService {
    hashedPassWord(value: string): string {
        return crypto.createHash('sha512').update(value).digest('hex');
    }
}
