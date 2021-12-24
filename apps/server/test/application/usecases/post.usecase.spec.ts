import {PostUsecase} from '../../../src/application/usecases/post/post.usecase';
import {PostRepositoryMock} from '../../../src/infrastructure/datasource/repository/post.repository';
import {Test} from '@nestjs/testing';
import {RoomRepositoryMock} from '../../../src/infrastructure/datasource/repository/room.repository';
import {UserRepositoryMock} from '../../../src/infrastructure/datasource/repository/user.repository';
import {IPostRepository} from '../../../src/domain/models/post/post.repository.interface';
import {IUserRepository} from '../../../src/domain/models/user/user.repository.interface';
import {IRoomRepository} from '../../../src/domain/models/room/room.repository.interface';

describe('postUsecaseTest', () => {
    let postUsecase: PostUsecase;
    let postRepository: PostRepositoryMock;
    let userRepository: UserRepositoryMock;
    let roomRepository: RoomRepositoryMock;
    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                PostUsecase,
                {
                    provide : IPostRepository,
                    useClass: PostRepositoryMock,
                },
                {
                    provide : IRoomRepository,
                    useClass: RoomRepositoryMock,
                },
                {
                    provide : IUserRepository,
                    useClass: UserRepositoryMock,
                },
            ],
        }).compile();

        postUsecase = moduleRef.get<PostUsecase>(PostUsecase);
        postRepository = moduleRef.get(IPostRepository);
        userRepository = moduleRef.get(IUserRepository);
        roomRepository = moduleRef.get(IRoomRepository);
    });

    it('getPostsLatest100', async () => {
        const returnValue = [postRepository.inMemoryRecords[0]];
        jest.spyOn(postRepository, 'find').mockReturnValueOnce(Promise.resolve(returnValue));
        expect(await postUsecase.getPostsLatest100()).toEqual(returnValue);
        expect(postRepository.find).toHaveBeenCalled();
    });

    it('addPost', async () => {
        const returnValue = postRepository.inMemoryRecords[0];
        jest.spyOn(postRepository, 'add').mockReturnValueOnce(Promise.resolve(returnValue));
        expect(await postUsecase.addPost({
            message: 'おはよう！',
            room   : roomRepository.inMemoryRecords[0],
            owner  : userRepository.inMemoryRecords[0],
            replyTo: null,
        })).toEqual(returnValue);
        expect(postRepository.add).toHaveBeenCalled();
    });
});
