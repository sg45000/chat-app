import {UserModel} from './user.model';

export interface IUserRepository {
    create(user: UserModel): Promise<UserModel>
}
