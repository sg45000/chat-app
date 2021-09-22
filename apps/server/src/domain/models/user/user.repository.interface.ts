import {UserModel} from './user.model';
import {UserMail} from './user.value';

export abstract class IUserRepository {
    /**
     * DBにユーザーを登録する
     * @param user
     */
    abstract create(user: UserModel): Promise<UserModel>

    /**
     * メールアドレスをキーにDBからユーザーを取得する
     * @param mail
     */
    abstract findOneByMail(mail: UserMail): Promise<UserModel>
}
