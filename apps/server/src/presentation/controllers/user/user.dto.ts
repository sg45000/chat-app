import {Field, InputType, ObjectType} from '@nestjs/graphql';
import {UserModel} from '../../../domain/models/user/user.model';
import {Matches, MaxLength, MinLength} from 'class-validator';
import {RegexConst} from '../../../const/regex.const';

@InputType()
export class SignupUserRequest {
    @Field()
    readonly name: string;

    @Field()
    readonly mail: string;

    @Field()
    @MinLength(8, {message: 'ユーザーのパスワードは8文字以上に設定してください。'})
    @MaxLength(16, {message: 'ユーザーのパスワードは16文字以下に設定してください。'})
    @Matches(RegexConst.HALF_WIDTH_ALPHANUMERIC, {message: 'ユーザーのパスワードは英数字を設定してください。'})
    readonly password: string;
}

@ObjectType()
export class UserResponse {
    constructor(user: UserModel) {
        this.name = user.name;
        this.mail = user.mail;
    }
    @Field({description: '名前'})
    readonly name: string;
    @Field({description: 'メールアドレス'})
    readonly mail: string;
}
