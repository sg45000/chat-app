import {SessionModel} from './session.model';
import {EntityPId} from '../common.value';

export abstract class ISessionRepository {
    /**
     * DBにセッションを登録する
     * @param session
     */
    abstract create(session: SessionModel): Promise<void>;

    abstract findOne(id: EntityPId): Promise<SessionModel | null>
}
