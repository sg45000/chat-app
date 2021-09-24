import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {LoginUserRequest, SignupUserRequest, UserResponse} from './user.dto';
import {UserUsecase} from '../../../application/usecases/user/user.usecase';
import {UserModel} from '../../../domain/models/user/user.model';

@Resolver(UserResponse)
export class UserResolver {
    constructor(
        private readonly userAppService: UserUsecase,
    ) {
    }

    @Query(() => String)
    sayHello(): UserResponse {
        return new UserResponse(
            UserModel.create({
                lastName      : 'サンプル',
                firstName     : '太郎',
                mail          : 'sample@nnn.co.jp',
                hashedPassWord: 'password',
            })
        );
    }

    @Mutation(returns => UserResponse)
    async signup(@Args('params') params: SignupUserRequest): Promise<UserResponse> {
        const user = await this.userAppService.signUpUser(params);
        return new UserResponse(user);
    }

    @Mutation(returns => UserResponse)
    async login(@Args('params') params: LoginUserRequest): Promise<UserResponse> {
        const loginOutput = await this.userAppService.login(params);
        // fixme sessionをクッキーに
        return new UserResponse(loginOutput.user);
    }
}
