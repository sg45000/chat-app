import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class UserDto {
    @Field()
    readonly name: string;

    @Field()
    readonly mail: string;

    @Field()
    readonly password: string;
}
