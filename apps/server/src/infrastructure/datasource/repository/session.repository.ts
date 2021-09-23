import {ISessionRepository} from '../../../domain/models/session/session.repository.interface';
import {UserModel} from '../../../domain/models/user/user.model';
import {SessionModel} from '../../../domain/models/session/session.model';
import {ServiceUnavailableException} from '@nestjs/common';
import {MyUtil} from '../../../utils/my.util';

export class SessionRepository extends ISessionRepository {
    create(user: UserModel): Promise<SessionModel> {
        throw new ServiceUnavailableException();
    }
}
export class SessionRepositoryMock extends ISessionRepository {
    create(user: UserModel): Promise<SessionModel> {
        return new Promise((resolve)=>{
            resolve(SessionModel.create(MyUtil.createUUID(), user));
        });
    }
}
