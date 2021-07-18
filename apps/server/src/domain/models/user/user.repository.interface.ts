import {UserModel} from './user.model';

export interface IUserRepository {
    create(): Promise<UserModel>
}
