import {Injectable} from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
    /**
     * 文字列をハッシュ化する
     * @param value
     */
    createHashedPassword(value: string): string {
        return crypto.createHash('sha512').update(value).digest('hex');
    }
}
