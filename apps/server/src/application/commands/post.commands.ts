import {UserModel} from '../../domain/models/user/user.model';
import {RoomModel} from '../../domain/models/room/room.model';

export interface PostAddCommand {
    readonly message: string;
    readonly owner: UserModel;
    readonly room: RoomModel;
    readonly replyTo: string | null;
}
