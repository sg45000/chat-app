import {IllegalArgumentException} from '../../../types/error.types';
import {RegexConst} from '../../../const/regex.const';
import {AbstractValueObject} from '../../abstract/abstract-value-object';
import * as crypto from 'crypto';
import {InternalServerErrorException} from '@nestjs/common';

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
    private static readonly MIN_LENGTH = 8;
    private static readonly MAX_LENGTH = 16;
    private constructor(value: string) {
        super(value);
    }

    /**
     * ファクトリメソッド
     * 生パスワードを渡してハッシュ化する
     * @param rawPassWord
     */
    static toHash(rawPassWord: string): UserHashedPass {
        if(this.illegalLengthValue(this.MIN_LENGTH, this.MAX_LENGTH, rawPassWord)) {
            throw new IllegalArgumentException(`ユーザーのパスワードは${this.MIN_LENGTH}文字以上、${this.MAX_LENGTH}文字以下で設定してください。`);
        }
        const hash = crypto.createHash('sha512').update(rawPassWord).digest('hex');
        return new UserHashedPass(hash);
    }

    /**
     * 再構築用のファクトリメソッド
     * @param hashedPassWord
     */
    static reconstruct(hashedPassWord: string): UserHashedPass {
        if(hashedPassWord.length < 128) {
            throw new InternalServerErrorException(
                `${UserHashedPass.name}.${UserHashedPass.reconstruct.name}の引数に問題があります。`
            );
        }
        return new UserHashedPass(hashedPassWord);
    }
}
