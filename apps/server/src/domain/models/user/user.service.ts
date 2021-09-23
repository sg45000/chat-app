import {Injectable} from '@nestjs/common';
import * as crypto from 'crypto';
import {IUserRepository} from './user.repository.interface';
import {UserHashedPass, UserMail} from './user.value';
import {UserModel} from './user.model';

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
    // fixme UserHashedPassインスタンス生成時にハッシュ化した方がいい？
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

    /**
     * メールアドレスとパスワードで一意にユーザーを検索する
     * @param mail
     * @param hashedPassWord
     */
    async identifyUser(mail: UserMail, hashedPassWord: UserHashedPass): Promise<UserModel | null> {
        const user = await this.userRepository.findOneByMail(mail);
        if(!user || !user.hashedPassWord.equals(hashedPassWord)) {
            return null;
        }
        return user;
    }
}
