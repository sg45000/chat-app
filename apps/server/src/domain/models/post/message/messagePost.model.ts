import {PostModel} from '../post.model';
import {MessagePostText} from './messagePost.value';
import {EntityPId} from '../../common.value';
import {UserModel} from '../../user/user.model';

export interface MessagePostModelArgs {
    text: string;
    replyTo: EntityPId<UserModel>
}
export interface MessagePostModelProps {
    text: MessagePostText;
}

export class MessagePostModel extends PostModel<MessagePostModelProps, MessagePostModel> {
    static create(args: MessagePostModelArgs): MessagePostModel {
        return new MessagePostModel(
            {
                text     : new MessagePostText(args.text),
                createdAt: new Date(),
                replyTo  : args.replyTo,
            },
            EntityPId.create()
        );
    }
}

