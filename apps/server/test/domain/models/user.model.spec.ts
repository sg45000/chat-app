import {UserModel} from '../../../src/domain/models/user/user.model';
import {UserName} from '../../../src/domain/models/user/user.value';
import {IllegalArgumentException} from '../../../src/types/error.types';

describe('UserModel', () => {
    test('ユーザー名前が1文字以上２０文字以下ではない場合エラー', () => {
        expect(() => new UserName('')).toThrowError(IllegalArgumentException);
        const userName1Length = new UserName('あ'.repeat(1));
        expect(userName1Length.value).toBe('あ'.repeat(1));

        expect(() => new UserName('あ'.repeat(21))).toThrowError(IllegalArgumentException);
        const userName20Length = new UserName('あ'.repeat(20));
        expect(userName20Length.value).toBe('あ'.repeat(20));
    });

});
