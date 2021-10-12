import {UserModel} from './user.model';
import {UserMail} from './user.value';
import {EntityPId} from '../common.value';

export abstract class IUserRepository {
  /**
   * DBにユーザーを登録する
   * @param user
   */
  abstract create(user: UserModel): Promise<UserModel>;

  /**
   * IDをキーにDBからユーザーを取得する
   * @param id
   */
  abstract findOneById(id: EntityPId<'user'>): Promise<UserModel | null>;

  /**
   * メールアドレスをキーにDBからユーザーを取得する
   * @param mail
   */
  abstract findOneByMail(mail: UserMail): Promise<UserModel | null>;
}
