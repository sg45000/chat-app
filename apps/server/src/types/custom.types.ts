import {IncomingMessage} from 'http';
import {UserModel} from '../domain/models/user/user.model';

export type RequestWithUser = IncomingMessage & {user: UserModel}
