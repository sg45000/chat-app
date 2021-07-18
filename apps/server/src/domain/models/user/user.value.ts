import {IncompatibleValueError} from '../../../types/error.types';
import {RegexConst} from '../../../const/regex.const';

export class UserName {
    value: string;
    constructor(value: string) {
        this.checkLength(value);
        this.value = value;
    }

    checkLength(value: string) {
        if(value.length <= 1 || value.length >= 20) {
            throw new IncompatibleValueError("ユーザーの名前は1文字以上、20文字以下で設定してください。")
        }
    }

}

export class UserMail {
    value: string;
    constructor(value: string) {
        this.checkFormat(value)
        this.value = value;
    }

    checkFormat(value: string) {
        const regex = new RegExp(RegexConst.emailRegex)
        if(regex.test(value)){
            throw new IncompatibleValueError("正しいメールアドレスの形式を設定してください。")
        }
    }
}
