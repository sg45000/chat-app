import {AbstractDomainModelObject} from '../../../abstract/abstract-domain-model-object';
import {EntityPId} from '../common.value';
import {UserModel} from '../user/user.model';

export interface SessionModelProps {
    id: EntityPId;
    user: UserModel;
}

export class SessionModel extends AbstractDomainModelObject<SessionModelProps> {
    static create(id: string, user: UserModel): SessionModel {
        return new SessionModel({
            id: new EntityPId(id),
            user,
        });
    }

    get user(): UserModel {
        return this.props.user;
    }
}
