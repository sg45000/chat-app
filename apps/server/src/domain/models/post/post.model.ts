import {EntityPId} from '../common.value';
import {PostMessage} from './post.value';
import {AbstractDomainModelObject} from '../../abstract/abstract-domain-model-object';

export interface PostModelArgs {
    message: string;
    replyTo: EntityPId<PostModel> | null;
}
export interface PostModelProps {
    message: PostMessage;
    replyTo: EntityPId<PostModel> | null;
    createdAt: Date;
}

export class PostModel extends AbstractDomainModelObject<PostModelProps, PostModel> {
    /**
     * エンティティの新規作成
     * @param args
     */
    static create(args: PostModelArgs): PostModel {
        return new PostModel(
            {
                message  : new PostMessage(args.message),
                replyTo  : args.replyTo,
                createdAt: new Date(),
            },
            EntityPId.create()
        );
    }

    /**
     * エンティティの再構築
     * @param args
     * @param id
     */
    static reconstruct(args: PostModelArgs, id: EntityPId<PostModel>): PostModel {
        return new PostModel(
            {
                message  : new PostMessage(args.message),
                replyTo  : args.replyTo,
                createdAt: new Date(),
            },
            id
        );
    }
}
