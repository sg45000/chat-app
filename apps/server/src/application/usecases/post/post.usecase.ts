import {Injectable} from '@nestjs/common';
import {IPostRepository} from '../../../domain/models/post/post.repository.interface';
import {PostModel} from '../../../domain/models/post/post.model';

@Injectable()
export class PostUsecase {
    constructor(
        private readonly postRepository: IPostRepository
    ) {
    }

    /**
     * 100件の投稿を取得する。
     */
    async getPostsLatest100(): Promise<PostModel[]> {
        const posts = await this.postRepository.find(100);
        return posts;
    }
}
