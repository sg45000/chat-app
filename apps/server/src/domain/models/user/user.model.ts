import {UserHashedPass, UserMail, UserName} from './user.value';

export class UserModel {
    constructor(name: UserName, mail: UserMail, hashedPassWord: UserHashedPass) {
        this.name = name;
        this.mail = mail;
        this.hashedPassWord = hashedPassWord;
    }
    name: UserName;
    mail: UserMail;
    hashedPassWord: UserHashedPass;
}
