import {Injectable} from '@nestjs/common';
import {IPostRepository} from '../../../domain/models/post/post.repository.interface';
import {PostModel} from '../../../domain/models/post/post.model';
import {PostAddCommand} from '../../commands/post.commands';
import {UserModel} from '../../../domain/models/user/user.model';
import {RoomModel} from '../../../domain/models/room/room.model';

@Injectable()
export class PostUsecase {
    constructor(
        private readonly postRepository: IPostRepository
    ) {
    }

    /**
     * 最大100件の投稿を取得する。
     */
    async getPostsLatest100(): Promise<PostModel[]> {
        const posts = await this.postRepository.find(100);
        return posts;
    }

    /**
     * 投稿を1件追加する
     * @param command
     * @param owner
     * @param room
     */
    async addPost(command: PostAddCommand): Promise<PostModel> {
        const post = PostModel.create({
            message  : command.message,
            owner    : command.owner.id,
            room     : command.room.id,
            replyTo  : null,
            createdAt: new Date,
        });
        return await this.postRepository.add(post);
    }
}
