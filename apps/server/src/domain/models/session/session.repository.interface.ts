import {UserModel} from '../user/user.model';
import {SessionModel} from './session.model';

export abstract class ISessionRepository {
    /**
     * DBにセッションを登録する
     * @param user
     */
    abstract create(user: UserModel): Promise<SessionModel>;
}
