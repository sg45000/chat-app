import {Query, Args, Resolver} from '@nestjs/graphql';
import {UseGuards} from '@nestjs/common';
import {AuthGuard} from '../../authentication/auth.guard';
import {User} from '../../../decorators/user.decorator';
import {UserModel} from '../../../domain/models/user/user.model';
import {RoomResponse} from './room.dto';
import {RoomUsecase} from '../../../application/usecases/room/room.usecase';

@Resolver(RoomResponse)
export class RoomResolver {
    constructor(
        private readonly roomUsecase: RoomUsecase,
    ) {
    }

    @Query(() => [RoomResponse])
    @UseGuards(AuthGuard)
    async rooms(@User() user: UserModel): Promise<RoomResponse[]> {
        const rooms = await this.roomUsecase.getAllRooms();
        const response = rooms.map(r => new RoomResponse(r));
        return response;
    }

}
