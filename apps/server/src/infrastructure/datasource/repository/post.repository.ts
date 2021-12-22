import {IPostRepository} from '../../../domain/models/post/post.repository.interface';
import {PostModel} from '../../../domain/models/post/post.model';
import {Injectable} from '@nestjs/common';

@Injectable()
export class MockPostRepository extends IPostRepository {
    inMemoryPosts = [
        PostModel.create({message: 'おはよう！', replyTo: null}),
        PostModel.create({message: 'こんにちは！', replyTo: null}),
        PostModel.create({message: 'どうも', replyTo: null}),
    ]
    /**
     * 投稿を取得する
     * @param limit 取得最大件数
     */
    async find(limit = 100): Promise<PostModel[]> {
        return new Promise<PostModel[]>((resolve) => {
            const length = this.inMemoryPosts.length;
            const overLength = limit - length < 0 ? Math.abs(limit - length) : 0;
            const limited = this.inMemoryPosts.slice(overLength, length);
            resolve(limited);
        });
    }

    /**
     * 1件投稿を追加する
     * @param post
     */
    async add(post: PostModel): Promise<PostModel> {
        return new Promise<PostModel>((resolve) => {
            this.inMemoryPosts.push(post);
            resolve(post);
        });
    }
}
