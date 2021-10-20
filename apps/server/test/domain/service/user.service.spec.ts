import {UserService} from '../../../src/domain/models/user/user.service';
import {UserRepositoryMock} from '../../../src/infrastructure/datasource/repository/user.repository';
import {UserModel} from '../../../src/domain/models/user/user.model';
import {EntityPId} from '../../../src/domain/models/common.value';
import {UserHashedPass, UserMail} from '../../../src/domain/models/user/user.value';

describe('UserService', () => {
    it('identifyUser', async () => {
        const user = UserModel.reconstruct(
            {
                firstName     : 'あああ',
                lastName      : 'いいい',
                mail          : 'samle@googlea.com',
                hashedPassWord: 'djqe',
            },
            EntityPId.create(),
        );
        const userRepository = new UserRepositoryMock();
        jest.spyOn(userRepository, 'findOneByMail').mockImplementation(
            () =>
                new Promise((resolve) => resolve(user))
        );

        const userService = new UserService(userRepository);

        // ユーザーを特定した場合
        const foundUser = await userService.identifyUser(user.mail, user.hashedPassWord);
        expect(foundUser).toBe(user);

        // パスワードが間違っていた場合
        const wrongPassUser = await userService.identifyUser(user.mail, new UserHashedPass('12345'));
        expect(wrongPassUser).toBe(null);

        // メールアドレスが間違っていた場合
        jest.spyOn(userRepository, 'findOneByMail').mockImplementation(
            () =>
                new Promise((resolve) => resolve(null))
        );
        const wrongMailUser = await userService.identifyUser(user.mail, user.hashedPassWord);
        expect(wrongMailUser).toBe(null);
    });
});
