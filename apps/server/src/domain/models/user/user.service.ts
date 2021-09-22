import {Injectable} from '@nestjs/common';
import * as crypto from 'crypto';
import {IUserRepository} from './user.repository.interface';
import {UserMail} from './user.value';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: IUserRepository,
    ) {
    }
    /**
     * 文字列をハッシュ化する
     * @param value
     */
    createHashedPassword(value: string): string {
        return crypto.createHash('sha512').update(value).digest('hex');
    }

    /**
     * メールアドレスが同一のユーザーが存在するか確認する
     * @param mail
     */
    async existsDuplicatedUser(mail: UserMail): Promise<boolean> {
        const duplicatedUser = await this.userRepository.findOneByMail(mail);
        return !!duplicatedUser;
    }
}
