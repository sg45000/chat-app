import {UserModel} from './user.model';

export abstract class IUserRepository {
    /**
     * DBにユーザーを登録する
     * @param user
     */
    abstract create(user: UserModel): Promise<UserModel>
}
