import {AbstractDomainModelObject} from '../../abstract/abstract-domain-model-object';
import {EntityPId} from '../common.value';
import {UserModel} from '../user/user.model';
import {DomainModelTypes} from '../../DomainModel.types';

export interface PostModelProps {
    replyTo: EntityPId<UserModel> | null;
    createdAt: Date;
}

export abstract class PostModel<T, MODEL_TYPE extends DomainModelTypes> extends AbstractDomainModelObject<T & PostModelProps, MODEL_TYPE> {

}
