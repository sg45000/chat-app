import {UserModel} from '../../domain/models/user/user.model';
import {BadRequestException, Injectable} from '@nestjs/common';
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
            lastName      : createCommand.lastName,
            firstName     : createCommand.firstName,
            mail          : createCommand.mail,
            hashedPassWord: this.userService.createHashedPassword(createCommand.password),
        });

        const duplicated = await this.userService.existsDuplicatedUser(user.mail);
        if(duplicated) {
            throw new BadRequestException('指定のメールアドレスは既に登録されています。');
        }

        return await this.userRepository.create(user);
    }
}
