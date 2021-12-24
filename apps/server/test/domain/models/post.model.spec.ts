import {PostModel} from '../../../src/domain/models/post/post.model';
import {EntityPId} from '../../../src/domain/models/common.value';

describe('PostModelTest', ()=>{
    const posts: PostModel[] = [];
    beforeAll(() => {
        const post1 = PostModel.create({
            message  : 'おはよう！',
            room     : EntityPId.create(),
            owner    : EntityPId.create(),
            replyTo  : null,
            createdAt: new Date(),
        });

        const post2 = PostModel.create({
            message  : 'こんにちは！',
            room     : EntityPId.create(),
            owner    : EntityPId.create(),
            replyTo  : null,
            createdAt: new Date(),

        });

        posts.push(post1, post2);
    });
    
    it('equals to be truthy', () => {
        const post1 = posts[0];

        const post1Reconstruct = PostModel.reconstruct(
            {
                message  : 'おはよう！',
                room     : EntityPId.create(),
                owner    : EntityPId.create(),
                replyTo  : null,
                createdAt: new Date(),

            },
            post1.id
        );
        expect(post1.equals(post1Reconstruct)).toBeTruthy();
    });

    it('equals to be falsy', () => {
        const post1 = posts[0];

        const post3 = PostModel.create({
            message  : 'おはよう！',
            room     : EntityPId.create(),
            owner    : EntityPId.create(),
            replyTo  : null,
            createdAt: new Date(),

        });
        expect(post1.equals(post3)).toBeFalsy();
    });
});
