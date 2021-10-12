import {AbstractDomainModelObject} from '../../../abstract/abstract-domain-model-object';
import {EntityPId} from '../common.value';
import {UserModel} from '../user/user.model';

export interface SessionModelProps {
    userId: EntityPId<UserModel>;
}

export class SessionModel extends AbstractDomainModelObject<SessionModelProps, SessionModel> {
    static create(user: UserModel): SessionModel {
        return new SessionModel(
            {
                userId: user.id,
            },
            EntityPId.create(),
        );
    }

    static reconstruct(sessionId: EntityPId<SessionModel>, userId: EntityPId<UserModel>) {
        return new SessionModel(
            {
                userId
            },
            sessionId
        );
    }

    get userId(): EntityPId<UserModel> {
        return this.props.userId;
    }
}
