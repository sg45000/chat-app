import {IUserRepository} from '../../../domain/models/user/user.repository.interface';
import {UserModel} from '../../../domain/models/user/user.model';
import {Injectable} from '@nestjs/common';
import {PrismaClientService} from '../orm/prisma-client.service';
import {UserMail} from '../../../domain/models/user/user.value';
import {EntityPId} from '../../../domain/models/common.value';

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        private readonly prismaClientService: PrismaClientService
    ) {}


    async create(user: UserModel): Promise<UserModel> {
        const userEntity = await this.prismaClientService.user.create({
            data: {
                id       : user.id.value,
                firstName: user.name.value.firstName,
                lastName : user.name.value.lastName,
                mail     : user.mail.value,
                hashedPw : user.hashedPassWord.value,
            },
        });
        return UserModel.reconstruct(
            {
                firstName     : userEntity.firstName,
                lastName      : userEntity.lastName,
                mail          : userEntity.mail,
                hashedPassWord: userEntity.hashedPw,
            },
            EntityPId.reconstruct(userEntity.id),
        );
    }

    async findOneById(id: EntityPId): Promise<UserModel | null> {
        const userEntity = await this.prismaClientService.user.findUnique({
            where: {id: id.value}
        });
        if (!userEntity) {
            return null;
        }
        return UserModel.reconstruct(
            {
                firstName     : userEntity.firstName,
                lastName      : userEntity.lastName,
                mail          : userEntity.mail,
                hashedPassWord: userEntity.hashedPw,
            },
            EntityPId.reconstruct(userEntity.id),
        );
    }

    async findOneByMail(mail: UserMail): Promise<UserModel | null> {
        const userEntity = await this.prismaClientService.user.findFirst({
            where: {
                mail: mail.value,
            },
        });
        if (!userEntity) {
            return null;
        }
        return UserModel.reconstruct(
            {
                firstName     : userEntity.firstName,
                lastName      : userEntity.lastName,
                mail          : userEntity.mail,
                hashedPassWord: userEntity.hashedPw,
            },
            EntityPId.reconstruct(userEntity.id),
        );
    }
}

@Injectable()
export class UserRepositoryMock implements IUserRepository {
    async create(user: UserModel): Promise<UserModel> {
        return new Promise((resolve) => {
            resolve(user);
        });
    }

    async findOneById(id: EntityPId): Promise<UserModel | null> {
        return new Promise((resolve) => {
            resolve(
                UserModel.reconstruct(
                    {
                        firstName     : 'あああ',
                        lastName      : 'いいい',
                        mail          : 'sample@googlea.com',
                        hashedPassWord: 'sdfghjk',
                    },
                    EntityPId.create(),
                ),
            );
        });
    }

    async findOneByMail(mail: UserMail): Promise<UserModel | null> {
        return new Promise((resolve) => {
            resolve(
                UserModel.reconstruct(
                    {
                        firstName     : 'あああ',
                        lastName      : 'いいい',
                        mail          : 'sample@googlea.com',
                        hashedPassWord: 'sdfghjk',
                    },
                    EntityPId.create(),
                ),
            );
        });
    }
}
