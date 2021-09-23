import {AbstractDomainModelObject} from '../../../abstract/abstract-domain-model-object';
import {EntityPId} from '../common.value';
import {UserModel} from '../user/user.model';

export interface SessionModelProps {
    user: UserModel;
}

export class SessionModel extends AbstractDomainModelObject<SessionModelProps> {
    static create(user: UserModel, id?: EntityPId): SessionModel {
        return new SessionModel(
            {
                user,
            },
            this.getEntityPId(id)
        );
    }

    get user(): UserModel {
        return this.props.user;
    }
}
