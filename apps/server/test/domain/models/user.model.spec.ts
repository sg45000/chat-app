import {UserModel} from '../../../src/domain/models/user/user.model';

describe('UserModel', () => {
    test('equals', () => {
        const user1 = UserModel.create({
            firstName     : '田中',
            lastName      : '太郎',
            mail          : 'tanaka@gmail.com',
            hashedPassWord: '123456789',
        });
        const user2 = UserModel.create({
            firstName     : '田中',
            lastName      : '太郎',
            mail          : 'tanaka@gmail.com',
            hashedPassWord: '123456789',
        });
        expect(user1.equals(user2)).toBe(false);
    });

});
