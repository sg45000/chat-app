import {Field, InputType, ObjectType} from '@nestjs/graphql';
import {UserModel} from '../../../domain/models/user/user.model';

@InputType()
export class SignupUserRequest {
    @Field()
    readonly name: string;

    @Field()
    readonly mail: string;

    @Field()
    readonly password: string;
}

@ObjectType()
export class UserResponse {
    constructor(user: UserModel) {
        this.name = user.name.value;
        this.mail = user.mail.value;
    }
    @Field({description: '名前'})
    readonly name: string;
    @Field({description: 'メールアドレス'})
    readonly mail: string;
}
