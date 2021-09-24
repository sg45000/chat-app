import {AbstractDomainModelObject} from '../../../abstract/abstract-domain-model-object';
import {EntityPId} from '../common.value';
import {UserModel} from '../user/user.model';

export interface SessionModelProps {
    user: UserModel;
}

export class SessionModel extends AbstractDomainModelObject<SessionModelProps> {
    static create(user: UserModel): SessionModel {
        return new SessionModel(
            {
                user,
            },
            EntityPId.create(),
        );
    }

    get user(): UserModel {
        return this.props.user;
    }
}
