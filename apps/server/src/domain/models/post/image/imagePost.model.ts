import {PostModel} from '../post.model';
import {EntityPId} from '../../common.value';
import {UserModel} from '../../user/user.model';
import {ImagePostDataUri} from './imagePost.value';
export interface ImagePostModelArgs {
    imageDataUri: string;
    replyTo: EntityPId<UserModel>
}
export interface ImagePostModelProps {
    imageDataUri: ImagePostDataUri;
}
export class ImagePostModel extends PostModel<ImagePostModelProps, ImagePostModel> {
    static create(args: ImagePostModelArgs): ImagePostModel {
        return new ImagePostModel(
            {
                imageDataUri: new ImagePostDataUri(args.imageDataUri),
                createdAt   : new Date(),
                replyTo     : args.replyTo,
            },
            EntityPId.create()
        );
    }
}

