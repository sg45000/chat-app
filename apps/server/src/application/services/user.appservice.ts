import {UserModel} from '../../domain/models/user/user.model';
import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {IUserRepository} from '../../domain/models/user/user.repository.interface';
import {SessionCreateCommand, UserCreateCommand} from '../commands/user.commands';
import {UserService} from '../../domain/models/user/user.service';
import {UserHashedPass, UserMail} from '../../domain/models/user/user.value';
import {SessionModel} from '../../domain/models/session/session.model';
import {ISessionRepository} from '../../domain/models/session/session.repository.interface';

@Injectable()
export class UserAppService {
    constructor(
        private readonly userService: UserService,
        private readonly userRepository: IUserRepository,
        private readonly sessionRepository: ISessionRepository,
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

    /**
     * ユーザーの認証を行う。
     */
    async login(command: SessionCreateCommand): Promise<SessionModel> {
        const user = await this.userService.identifyUser(
            new UserMail(command.mail),
            new UserHashedPass(this.userService.createHashedPassword(command.password)),
        );

        if(!user) {
            throw new NotFoundException('メールアドレスまたはパスワードに誤りがあります。');
        }
        const session = SessionModel.create(user);
        return await this.sessionRepository.create(session);
    }
}
