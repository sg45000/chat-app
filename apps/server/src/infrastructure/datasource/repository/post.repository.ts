import {IPostRepository} from '../../../domain/models/post/post.repository.interface';
import {PostModel} from '../../../domain/models/post/post.model';
import {Injectable, Inject} from '@nestjs/common';
import {RoomRepositoryMock} from './room.repository';
import {UserRepositoryMock} from './user.repository';
import {IRoomRepository} from '../../../domain/models/room/room.repository.interface';
import {IUserRepository} from '../../../domain/models/user/user.repository.interface';
import {PrismaClientService} from '../orm/prisma-client.service';
import {EntityPId} from '../../../domain/models/common.value';
import {DbInsertException} from '../../../types/error.types';

@Injectable()
export class PostRepository extends IPostRepository {
    constructor(
        private readonly prismaClientService: PrismaClientService
    ) {
        super();
    }

    /**
     * 投稿を取得する
     * @param limit 取得最大件数
     */
    find = async (limit = 100): Promise<PostModel[]> => {
        const results = await this.prismaClientService.post.findMany({take: limit});
        return results.map(post => PostModel.reconstruct({
            message  : post.message,
            replyTo  : post.replyToId ? EntityPId.reconstruct(post.replyToId) : null,
            room     : EntityPId.reconstruct(post.roomId),
            owner    : EntityPId.reconstruct(post.ownerId),
            createdAt: post.createdAt,
        },
        EntityPId.reconstruct(post.id),
        ));
    }

    /**
     * 1件投稿を追加する
     * @param post
     */
    add = async (post: PostModel): Promise<PostModel> => {
        try {
            await this.prismaClientService.post.create({
                data: {
                    id       : post.id.value,
                    message  : post.message.value,
                    replyToId: post.replyTo?.value,
                    ownerId  : post.owner.value,
                    roomId   : post.room.value,
                }
            });
            return post;
        } catch (e) {
            console.error(e);
            throw new DbInsertException('Postレコードの作成に失敗しました。');
        }
    }
}

@Injectable()
export class PostRepositoryMock extends IPostRepository {
    inMemoryRecords: PostModel[] = [];

    constructor(
        @Inject(IRoomRepository) private readonly roomRepository: RoomRepositoryMock,
        @Inject(IUserRepository) private readonly userRepository: UserRepositoryMock,
    ) {
        super();
        const roomId = roomRepository.inMemoryRecords[0].id;
        const userId = userRepository.inMemoryRecords[0].id;
        this.inMemoryRecords.push(
            PostModel.create({message: 'おはよう！', replyTo: null, room: roomId, owner: userId, createdAt: new Date}),
            PostModel.create({message: 'こんにちは！', replyTo: null, room: roomId, owner: userId, createdAt: new Date}),
            PostModel.create({message: 'どうも', replyTo: null, room: roomId, owner: userId, createdAt: new Date}),
        );
    }
    /**
     * 投稿を取得する
     * @param limit 取得最大件数
     */
    find = async (limit = 100): Promise<PostModel[]> => {
        return new Promise<PostModel[]>((resolve) => {
            const length = this.inMemoryRecords.length;
            const overLength = limit - length < 0 ? Math.abs(limit - length) : 0;
            const limited = this.inMemoryRecords.slice(overLength, length);
            resolve(limited);
        });
    }

    /**
     * 1件投稿を追加する
     * @param post
     */
    add = async (post: PostModel): Promise<PostModel> => {
        return new Promise<PostModel>((resolve) => {
            this.inMemoryRecords.push(post);
            resolve(post);
        });
    }
}
