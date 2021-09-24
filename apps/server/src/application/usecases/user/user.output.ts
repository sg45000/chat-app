import {SessionModel} from '../../../domain/models/session/session.model';
import {UserModel} from '../../../domain/models/user/user.model';

export class UserLoginOutput {
    constructor(session: SessionModel, user: UserModel) {
        this.session = session;
        this.user = user;
    }
    readonly session: SessionModel;
    readonly user: UserModel;
}
