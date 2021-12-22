import {Query, Args, Mutation, Resolver} from '@nestjs/graphql';
import {Inject} from '@nestjs/common';
import {PostModel} from '../../../domain/models/post/post.model';
import {AddPostRequest, PostResponse} from './post.dto';
import {PostUsecase} from '../../../application/usecases/post/post.usecase';
import {PostAddCommand} from '../../../application/commands/post.commands';
import {RoomUsecase} from '../../../application/usecases/room/room.usecase';
import {UserUsecase} from '../../../application/usecases/user/user.usecase';
import {User} from '../../../decorators/user.decorator';
import {UserModel} from '../../../domain/models/user/user.model';
import {AuthGuard} from '../../authentication/auth.guard';
import {UseGuards} from '@nestjs/common';
import {RoomModel} from '../../../domain/models/room/room.model';
import {EntityPId} from '../../../domain/models/common.value';
import {MutationException} from '../../../types/error.types';

@Resolver(PostResponse)
export class PostResolver {
    constructor(
        private readonly postUsecase: PostUsecase,
        private readonly roomUsecase: RoomUsecase,
    ) {
    }

    @Query((returns) => [PostResponse], {name: 'getPosts', description: '投稿の最新100件を取得する'})
    @UseGuards(AuthGuard)
    async getPosts(): Promise<PostResponse[]> {
        const posts = await this.postUsecase.getPostsLatest100();
        return posts.map(p => new PostResponse(p));
    }

    @Mutation((returns) => PostResponse, {description: '投稿を一件追加する'})
    @UseGuards(AuthGuard)
    async addPost(@User() user: UserModel, @Args('params') params: AddPostRequest): Promise<PostResponse> {
        const room = await this.roomUsecase.getRoomById(params.roomId);
        if(!room) {
            throw new MutationException('メッセージの送信ができませんでした。トークルームが削除された可能性があります。');
        }
        const newPost = await this.postUsecase.addPost(
            {
                message: params.message,
                room   : room,
                replyTo: null,
                owner  : user,
            }
        );
        // await this.pubSub.publish('bookAdded', newBook);
        return new PostResponse(newPost);
    }

    // @Subscription(returns => PostModel)
    // async postAdded() {
    //     return this.pubSub.asyncIterator('postAdded');
    // }
}
