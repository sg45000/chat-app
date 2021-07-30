import {UserModel} from './user.model';

export abstract class IUserRepository {
    abstract create(user: UserModel): Promise<UserModel>
}
