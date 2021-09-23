import {UserHashedPass, UserMail, UserName} from './user.value';
import {AbstractDomainModelObject} from '../../../abstract/abstract-domain-model-object';
import {EntityPId} from '../common.value';

/**
 * UserModelのプロパティinterface
 */
export interface UserModelProps {
    id?: EntityPId;
    name: UserName;
    mail: UserMail;
    hashedPassWord: UserHashedPass;
}

/**
 * UserModel生成の引数interface
 */
export interface UserModelArgs {
    id?: string;
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
export class UserModel extends AbstractDomainModelObject<UserModelProps> {
    /**
     * ファクトリメソッド
     * @param args
     */
    static create(args: UserModelArgs): UserModel {
        return new UserModel(
            {
                name          : new UserName({lastName: args.lastName, firstName: args.firstName}),
                mail          : new UserMail(args.mail),
                hashedPassWord: new UserHashedPass(args.hashedPassWord),
            },
            args.id ? new EntityPId(args.id) : undefined,
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
