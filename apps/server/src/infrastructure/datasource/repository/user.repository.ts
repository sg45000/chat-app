import {IUserRepository} from '../../../domain/models/user/user.repository.interface';
import {UserModel} from '../../../domain/models/user/user.model';
import {Injectable} from '@nestjs/common';
import {PrismaClientService} from '../orm/prisma-client.service';

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        private readonly prismaClientService: PrismaClientService,
    ) {
    }
    async create(user: UserModel): Promise<UserModel> {
        const userEntity = await this.prismaClientService.user.create({
            data: {
                name: user.name,
                mail: user.mail,
                hashedPw: user.hashedPassWord,
            }
        });
        return UserModel.create({
            name: userEntity.name,
            mail: userEntity.mail,
            hashedPassWord: userEntity.hashedPw,
        });
    }

}

@Injectable()
export class UserRepositoryMock implements IUserRepository {
    create(user: UserModel): Promise<UserModel> {
        return new Promise((resolve, reject)=>{
            resolve(user);
        })
    }
}
