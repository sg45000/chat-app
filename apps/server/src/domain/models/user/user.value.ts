import {IncompatibleValueError} from '../../../types/error.types';
import {RegexConst} from '../../../const/regex.const';
import * as crypto from 'crypto';
import {AbstractValueObject} from '../../../abstract/abstract-value-object';
import {StringUtil} from '../../../utils/String.util';

/**
 * ユーザーの名前の値オブジェクト
 */
export class UserName extends AbstractValueObject<string> {
    private MAX_LENGTH = 20;
    private MIN_LENGTH = 1;
    constructor(value: string) {
        super(value);
        if(!StringUtil.between(this.MIN_LENGTH, this.MAX_LENGTH, value)) {
            throw new IncompatibleValueError(`ユーザーの名前は${this.MIN_LENGTH}文字以上、${this.MAX_LENGTH}文字以下で設定してください。`)
        }
    }
}

/**
 * ユーザーのメールアドレスの値オブジェクト
 */
export class UserMail extends AbstractValueObject<string> {
    constructor(value: string) {
        super(value);
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

        if(value.length <= this.MIN_LENGTH || value.length >= this.MAX_LENGTH) {
            throw new IncompatibleValueError(`ユーザーのパスワードは${this.MIN_LENGTH}文字以上、${this.MAX_LENGTH}文字以下で設定してください。`)
        }

        const regex = new RegExp(RegexConst.HALF_WIDTH_ALPHANUMERIC)
        if(!regex.test(value)){
            throw new IncompatibleValueError("ユーザーのパスワードは英数字を設定してください。")
        }
    }

    /**
     * 文字列をハッシュ化する
     * @param value
     */
    static hashed(value: string): string {
        return crypto.createHash('sha512').update(value).digest('hex');
    }
}
