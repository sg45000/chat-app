import {AbstractDomainModelObject} from '../../../abstract/abstract-domain-model-object';
import {EntityPId} from '../common.value';
import {UserModel} from '../user/user.model';

export interface SessionModelProps {
    userId: EntityPId<'user'>;
}

export class SessionModel extends AbstractDomainModelObject<SessionModelProps, 'session'> {
    static create(user: UserModel): SessionModel {
        return new SessionModel(
            {
                userId: user.id,
            },
            EntityPId.create(),
        );
    }

    static reconstruct(sessionId: EntityPId<'session'>, userId: EntityPId<'user'>) {
        return new SessionModel(
            {
                userId
            },
            sessionId
        );
    }

    get userId(): EntityPId<'user'> {
        return this.props.userId;
    }
}
