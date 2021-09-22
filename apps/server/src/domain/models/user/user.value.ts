import {IncompatibleValueError} from '../../../types/error.types';
import {RegexConst} from '../../../const/regex.const';
import * as crypto from 'crypto';
import {AbstractValueObject} from '../../../abstract/abstract-value-object';

/**
 * ユーザーの名前の値オブジェクト
 */
export class UserName extends AbstractValueObject<string> {
    constructor(value: string) {
        super(value);
        this.checkLength(value);
    }

    checkLength(value: string) {
        if(value.length <= 1 || value.length >= 20) {
            throw new IncompatibleValueError("ユーザーの名前は1文字以上、20文字以下で設定してください。")
        }
    }

}

/**
 * ユーザーのメールアドレスの値オブジェクト
 */
export class UserMail extends AbstractValueObject<string> {
    constructor(value: string) {
        super(value);
        this.checkFormat(value)
    }

    checkFormat(value: string) {
        const regex = new RegExp(RegexConst.EMAIL)
        if(!regex.test(value)){
            throw new IncompatibleValueError("正しいメールアドレスの形式を設定してください。")
        }
    }
}

/**
 * ユーザーのハッシュ化されたパスワードの値オブジェクト
 */
export class UserHashedPass extends AbstractValueObject<string> {
    private MAX_LENGTH = 16;
    private MIN_LENGTH = 8;
    constructor(value: string) {
        super(UserHashedPass.hashed(value));
        this.checkLength(value);
        this.checkFormat(value);
    }
    static hashed(value: string): string {
        return crypto.createHash('sha512').update(value).digest('hex');
    }
    checkLength(value: string) {
        if(value.length <= this.MIN_LENGTH || value.length >= this.MAX_LENGTH) {
            throw new IncompatibleValueError(`ユーザーのパスワードは${this.MIN_LENGTH}文字以上、${this.MAX_LENGTH}文字以下で設定してください。`)
        }
    }
    checkFormat(value: string) {
        const regex = new RegExp(RegexConst.HALF_WIDTH_ALPHANUMERIC)
        if(!regex.test(value)){
            throw new IncompatibleValueError("ユーザーのパスワードは英数字を設定してください。")
        }
    }
}
