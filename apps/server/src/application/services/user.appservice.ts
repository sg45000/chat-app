import {UserModel} from '../../domain/models/user/user.model';
import {Injectable} from '@nestjs/common';
import {IUserRepository} from '../../domain/models/user/user.repository.interface';
import {UserCreateCommand} from '../commands/user.commands';
import {UserService} from '../../domain/models/user/user.service';

@Injectable()
export class UserAppService {
    constructor(
        private readonly userService: UserService,
        private readonly userRepository: IUserRepository
    ) {
    }

    /**
     * ユーザーの登録を行う。
     * @param createCommand
     */
    async signUpUser(createCommand: UserCreateCommand): Promise<UserModel> {
        const user = UserModel.create({
            name:createCommand.name,
            mail: createCommand.mail,
            password: createCommand.password,
        });

        return await this.userRepository.create(user);
    }
}
