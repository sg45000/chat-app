import {UserModel} from './models/user/user.model';
import {SessionModel} from './models/session/session.model';
import {RoomModel} from './models/room/room.model';
import {PostModel} from './models/post/post.model';

export type DomainModelTypes = UserModel | SessionModel | RoomModel | PostModel;
