import {UserHashedPass, UserMail, UserName} from './user.value';
import {AbstractDomainModelObject} from '../../../abstract/abstract-domain-model-object';
import {EntityPId} from '../common.value';

/**
 * UserModelのプロパティinterface
 */
export interface UserModelProps {
    name: UserName;
    mail: UserMail;
    hashedPassWord: UserHashedPass;
}

/**
 * UserModel生成の引数interface
 */
export interface UserModelArgs {
    lastName: string;
    firstName: string;
    mail: string;
    hashedPassWord: string;
}

/**
 * UserModel
 * ユーザーのドメインモデル
 * インスタンス生成は静的なcreateメソッドで行う
 */
export class UserModel extends AbstractDomainModelObject<UserModelProps, UserModel> {
    /**
     * ファクトリメソッド
     * idも新しく採番
     * @param args
     */
    static create(args: UserModelArgs): UserModel {
        return new UserModel(
            {
                name          : new UserName({lastName: args.lastName, firstName: args.firstName}),
                mail          : new UserMail(args.mail),
                hashedPassWord: new UserHashedPass(args.hashedPassWord),
            },
            EntityPId.create()
        );
    }

    /**
     * 再構築用のファクトリメソッド
     * @param args
     * @param id
     */
    static reconstruct(args: UserModelArgs, id: EntityPId<UserModel>): UserModel {
        return new UserModel(
            {
                name          : new UserName({lastName: args.lastName, firstName: args.firstName}),
                mail          : new UserMail(args.mail),
                hashedPassWord: new UserHashedPass(args.hashedPassWord),
            },
            id,
        );
    }

    /**
     * ユーザーの名前を参照
     */
    get name(): UserName {
        return this.props.name;
    }

    /**
     * ユーザーのメールアドレスを参照
     */
    get mail(): UserMail {
        return this.props.mail;
    }

    /**
     * ユーザーのハッシュ化されたパスワードを参照
     */
    get hashedPassWord(): UserHashedPass {
        return this.props.hashedPassWord;
    }
}
