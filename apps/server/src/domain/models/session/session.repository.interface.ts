import {SessionModel} from './session.model';

export abstract class ISessionRepository {
    /**
     * DBにセッションを登録する
     * @param session
     */
    abstract create(session: SessionModel): Promise<void>;

    abstract findOne(key: string): Promise<SessionModel>
}
