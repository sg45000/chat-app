import {IUserRepository} from '../../../domain/models/user/user.repository.interface';
import {UserModel} from '../../../domain/models/user/user.model';
import {Injectable} from '@nestjs/common';

@Injectable()
export class UserRepository implements IUserRepository {
    create(): Promise<UserModel> {
        return Promise.resolve(undefined);
    }

}

@Injectable()
export class UserRepositoryMock implements IUserRepository {
    create(user: UserModel): Promise<UserModel> {
        return new Promise((resolve, reject)=>{
            resolve(user);
        })
    }
}
