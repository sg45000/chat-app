import {UserModel} from './models/user/user.model';
import {SessionModel} from './models/session/session.model';
import {RoomModel} from './models/room/room.model';
import {MessagePostModel} from './models/post/message/messagePost.model';
import {ImagePostModel} from './models/post/image/imagePost.model';

export type DomainModelTypes = UserModel | SessionModel | RoomModel | MessagePostModel | ImagePostModel;
