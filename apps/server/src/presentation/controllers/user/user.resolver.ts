import {Args, Mutation, Resolver} from '@nestjs/graphql';
import {UserDto} from './user.dto';

@Resolver()
export class UserResolver {

    @Mutation()
    async signup(@Args() user: UserDto) {

    }
}
