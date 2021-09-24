import {AbstractDomainModelObject} from '../../../abstract/abstract-domain-model-object';
import {EntityPId} from '../common.value';
import {UserModel} from '../user/user.model';

export interface SessionModelProps {
    userId: EntityPId;
}

export class SessionModel extends AbstractDomainModelObject<SessionModelProps> {
    static create(user: UserModel): SessionModel {
        return new SessionModel(
            {
                userId: user.id,
            },
            EntityPId.create(),
        );
    }

    get userId(): EntityPId {
        return this.props.userId;
    }
}
