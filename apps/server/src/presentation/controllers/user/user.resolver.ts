import {Args, Mutation, Resolver} from '@nestjs/graphql';
import {UserDto} from './user.dto';
import {UserAppService} from '../../../application/services/user.appservice';

@Resolver()
export class UserResolver {
    constructor(
        private readonly userAppService: UserAppService,
    ) {
    }

    @Mutation()
    async signup(@Args() user: UserDto): Promise<void> {
        await this.userAppService.signUpUser(user);
    }
}
