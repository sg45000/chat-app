import {IUserRepository} from '../../../domain/models/user/user.repository.interface';
import {UserModel} from '../../../domain/models/user/user.model';
import {UserMail, UserName} from '../../../domain/models/user/user.value';

export class UserRepository implements IUserRepository {
    create(): Promise<UserModel> {
        return Promise.resolve(undefined);
    }

}

export class UserRepositoryMock implements IUserRepository {
    create(user: UserModel): Promise<UserModel> {
        return new Promise((resolve, reject)=>{
            return user;
        })
    }
}
