import {UserModel} from '../../domain/models/user/user.model';
import {Injectable} from '@nestjs/common';
import {IUserRepository} from '../../domain/models/user/user.repository.interface';
import {UserCreateCommand} from '../commands/user.commands';
import {UserHashedPass, UserMail, UserName} from '../../domain/models/user/user.value';
import {UserService} from '../../domain/models/user/user.service';

@Injectable()
export class UserAppService {
    constructor(
        private readonly userService: UserService,
        private readonly userRepository: IUserRepository
    ) {
    }
    async signUpUser(createCommand: UserCreateCommand): Promise<UserModel> {
        const user = new UserModel(
            new UserName(createCommand.name),
            new UserMail(createCommand.mail),
            new UserHashedPass(createCommand.password),
        )

        return await this.userRepository.create(user);
    }
}
