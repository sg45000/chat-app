import {EntityPId} from '../common.value';
import {PostMessage} from './post.value';
import {AbstractDomainModelObject} from '../../abstract/abstract-domain-model-object';
import {RoomModel} from '../room/room.model';
import {UserModel} from '../user/user.model';

export interface PostModelArgs {
    message: string;
    room: EntityPId<RoomModel>;
    owner: EntityPId<UserModel>;
    replyTo: EntityPId<PostModel> | null;
    createdAt: Date;
}
export interface PostModelProps {
    message: PostMessage;
    replyTo: EntityPId<PostModel> | null;
    room: EntityPId<RoomModel>;
    owner: EntityPId<UserModel>;
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
                room     : args.room,
                owner    : args.owner,
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
                room     : args.room,
                owner    : args.owner,
                createdAt: args.createdAt,
            },
            id
        );
    }

    /**
     * メッセージプロパティ
     */
    get message(): PostMessage {
        return this.props.message;
    }

    /**
     * 投稿の所有者
     */
    get owner(): EntityPId<UserModel> {
        return this.props.owner;
    }

    /**
     * 返信先投稿
     */
    get replyTo(): EntityPId<PostModel> | null {
        return this.props.replyTo;
    }

    /**
     * トークルーム
     */
    get room(): EntityPId<RoomModel> {
        return this.props.room;
    }
}
