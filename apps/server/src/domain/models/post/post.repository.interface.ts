import {PostModel} from './post.model';

export abstract class IPostRepository {
    /**
     * 投稿を取得する
     * @param limit 取得最大件数
     */
    abstract find(limit?: number): Promise<PostModel[]>

    /**
     * 投稿を追加する
     * @param post
     */
    abstract add(post: PostModel): Promise<PostModel>
}
