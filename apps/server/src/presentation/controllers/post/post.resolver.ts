import {Query, Args, Subscription} from '@nestjs/graphql';
import {Inject} from '@nestjs/common';
import {PubSub} from 'apollo-server-express';
import {PostModel} from '../../../domain/models/post/post.model';
import {PostResponse} from './post.dto';
import {PostUsecase} from '../../../application/usecases/post/post.usecase';

export class PostResolver {
    constructor(
        private readonly postUsecase: PostUsecase,
        @Inject('PUB_SUB') private readonly pubSub: PubSub,
    ) {
    }

    @Query((returns) => [PostResponse], {name: 'getPosts', description: '投稿の最新100件を取得する'})
    async getPosts(): Promise<PostResponse[]> {
        const posts = await this.postUsecase.getPostsLatest100();
        return posts.map(p => new PostResponse(p));
    }

    // @Mutation((returns) => BooksDto, {description: 'bookを一件追加する'})
    // async addPost(@Args('book') book: BooksInput): Promise<BooksDto> {
    //     const newBook = await this.booksService.create(book);
    //     await this.pubSub.publish('bookAdded', newBook);
    //     return newBook;
    // }
    //
    // @Subscription(returns => PostModel)
    // async postAdded() {
    //     return this.pubSub.asyncIterator('postAdded');
    // }
}
