import {Message} from '../types/types';

export class PostsRepository {
  async get(): Promise<Message[]> {
    return new Promise((resolve)=>{
      resolve(
        [
          {
            msg: "今日遊ぼうよ",
            postAt: new Date(),
            isMine: false,
          },
          {
            msg: "OK!",
            postAt: new Date(),
            isMine: true,
          }
        ]
      )
    })
  }
}
