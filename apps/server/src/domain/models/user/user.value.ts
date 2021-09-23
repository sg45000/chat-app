import {IllegalArgumentException} from '../../../types/error.types';
import {RegexConst} from '../../../const/regex.const';
import {AbstractValueObject} from '../../../abstract/abstract-value-object';

export interface UserNameValue {
    lastName: string;
    firstName: string;
}
/**
 * ユーザーの名前の値オブジェクト
 */
export class UserName extends AbstractValueObject<UserNameValue> {
    private MAX_LENGTH = 20;
    private MIN_LENGTH = 1;
    constructor(value: UserNameValue) {
        super(value);
        const fullName = value.lastName + value.firstName;
        if(this.illegalLengthValue(this.MIN_LENGTH, this.MAX_LENGTH, fullName)) {
            throw new IllegalArgumentException(`ユーザーの名前は${this.MIN_LENGTH}文字以上、${this.MAX_LENGTH}文字以下で設定してください。`);
        }
    }
}

/**
 * ユーザーのメールアドレスの値オブジェクト
 */
export class UserMail extends AbstractValueObject<string> {
    constructor(value: string) {
        super(value);
        const regex = new RegExp(RegexConst.EMAIL);
        if(!regex.test(value)) {
            throw new IllegalArgumentException('正しいメールアドレスの形式を設定してください。');
        }
    }
}

/**
 * ユーザーのハッシュ化されたパスワードの値オブジェクト
 */
export class UserHashedPass extends AbstractValueObject<string> {
    constructor(value: string) {
        super(value);
    }

    // fixme インスタンス生成時にハッシュ化した方がいい？
}
