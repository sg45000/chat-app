import {Post} from '~/types/types';

const posts: Post[] = [
  {
    msg   : '今日遊ぼうよ',
    postAt: new Date(),
    isMine: false,
  },
  {
    msg   : 'OK!',
    postAt: new Date(),
    isMine: true,
  }
];

export class PostsRepository {
  async get(): Promise<Post[]> {
    return new Promise((resolve)=>{
      resolve(posts);
    });
  }

  async post(post: Post): Promise<void> {
    new Promise(() => {
      posts.push(post);
    });
  }
}
