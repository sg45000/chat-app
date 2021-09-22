import {UserHashedPass, UserMail, UserName} from './user.value';
import {AbstractDomainModelObject} from '../../../abstract/abstract-domain-model-object';

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
    name: string;
    mail: string;
    password: string;
}

/**
 * UserModel
 * ユーザーのドメインモデル
 * インスタンス生成は静的なcreateメソッドで行う
 */
export class UserModel extends AbstractDomainModelObject<UserModelProps>{
    /**
     * ファクトリメソッド
     * @param args
     */
    static create(args: UserModelArgs): UserModel {
        return new UserModel({
            name: new UserName(args.name),
            mail: new UserMail(args.mail),
            hashedPassWord: new UserHashedPass(args.password),
        });
    }

    /**
     * ユーザーの名前を参照
     */
    get name(): string {
        return this.props.name.value;
    }

    /**
     * ユーザーのメールアドレスを参照
     */
    get mail(): string {
        return this.props.mail.value;
    }

    /**
     * ユーザーのハッシュ化されたパスワードを参照
     */
    get hashedPass(): string {
        return this.props.hashedPassWord.value;
    }
}
