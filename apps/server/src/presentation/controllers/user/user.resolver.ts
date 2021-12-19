import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {LoginUserRequest, OwnUserResponse, SignupUserRequest, UserResponse} from './user.dto';
import {UserUsecase} from '../../../application/usecases/user/user.usecase';
import {UserModel} from '../../../domain/models/user/user.model';
import {UseGuards} from '@nestjs/common';
import {User} from '../../../decorators/user.decorator';
import {AuthGuard} from '../../authentication/auth.guard';

@Resolver(UserResponse)
export class UserResolver {
    constructor(
        private readonly userAppService: UserUsecase,
    ) {
    }

    @Query(() => UserResponse)
    @UseGuards(AuthGuard)
    ownUser(@User() user: UserModel): UserResponse {
        return new UserResponse(
            UserModel.create({
                lastName      : user.name.value.lastName,
                firstName     : user.name.value.firstName,
                mail          : user.mail.value,
                hashedPassWord: user.hashedPassWord,
            })
        );
    }

    @Mutation(returns => OwnUserResponse)
    async signup(@Args('params') params: SignupUserRequest): Promise<OwnUserResponse> {
        const loginOutput = await this.userAppService.signUpUser(params);
        return new OwnUserResponse(loginOutput.user, loginOutput.session);
    }

    @Mutation(returns => OwnUserResponse)
    async login(@Args('params') params: LoginUserRequest): Promise<OwnUserResponse> {
        const loginOutput = await this.userAppService.login(params);
        return new OwnUserResponse(loginOutput.user, loginOutput.session);
    }
}
