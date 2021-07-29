import {UserHashedPass, UserMail, UserName} from './user.value';

export class UserModel {
    constructor(name: UserName, mail: UserMail, hashedPassWord: UserHashedPass) {
        this.name = name;
        this.mail = mail;
        this.hashedPassWord = hashedPassWord;
    }
    private name: UserName;
    private mail: UserMail;
    private hashedPassWord: UserHashedPass;
}
