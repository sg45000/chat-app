import {IPostRepository} from '../../../domain/models/post/post.repository.interface';
import {PostModel} from '../../../domain/models/post/post.model';
import {Injectable, Inject} from '@nestjs/common';
import {RoomRepositoryMock} from './room.repository';
import {UserRepositoryMock} from './user.repository';
import {IRoomRepository} from '../../../domain/models/room/room.repository.interface';
import {IUserRepository} from '../../../domain/models/user/user.repository.interface';

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
