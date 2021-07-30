import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {SignupUserRequest, UserResponse} from './user.dto';
import {UserAppService} from '../../../application/services/user.appservice';
import {UserModel} from '../../../domain/models/user/user.model';
import {UserHashedPass, UserMail, UserName} from '../../../domain/models/user/user.value';

@Resolver(UserResponse)
export class UserResolver {
    constructor(
        private readonly userAppService: UserAppService,
    ) {
    }

    @Query(() => String)
    sayHello(): UserResponse {
        return new UserResponse(
            new UserModel(
                new UserName("ss"),
                new UserMail("ss"),
                new UserHashedPass("ass")
            ))
    }

    @Mutation(returns => UserResponse)
    async signup(@Args("params") params: SignupUserRequest): Promise<UserResponse> {
        const user = await this.userAppService.signUpUser(params);
        return new UserResponse(user);
    }
}
