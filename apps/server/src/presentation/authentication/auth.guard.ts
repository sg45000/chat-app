import {CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {GqlExecutionContext} from '@nestjs/graphql';
import {Request} from 'express';
import {EntityPId} from '../../domain/models/common.value';
import {ISessionRepository} from '../../domain/models/session/session.repository.interface';
import {IUserRepository} from '../../domain/models/user/user.repository.interface';
import {UserModel} from '../../domain/models/user/user.model';
import {SessionModel} from '../../domain/models/session/session.model';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly sessionRepository: ISessionRepository,
        private readonly userRepository: IUserRepository,
    ) {
    }

    /**
     * 認証をおこなう
     * 認証済みユーザー情報をリクエストに含める
     * @param context
     */
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = this.getRequest(context);
        try {
            const session = await this.authenticate(req);
            const user = await this.getCurrentUser(session);
            req.user = user;
        } catch (e) {
            console.info(e);
            return false;
        }
        return true;
    }

    /**
     * コンテキストからリクエスト情報を取得
     * @param context
     */
    getRequest(context: ExecutionContext): Request {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext<{req: Request}>().req;
    }

    /**
     * 認証を行う。
     * @param req
     */
    async authenticate(req: Request): Promise<SessionModel> {
        // authorizationヘッダーからJWTトークンを取得する
        const authToken = req.headers.authorization;
        if (!authToken) {
            throw new UnauthorizedException('Authorizationヘッダを指定してください。');
        }
        const bearerToken = authToken.substring(authToken.indexOf(' ') + 1);
        const session = await this.sessionRepository.findOne(EntityPId.reconstruct(bearerToken));
        if (!session) {
            throw new UnauthorizedException('セッションIDが不正です。');
        }
        return session;
    }

    /**
     * 認証済みユーザーの取得
     * @param session
     */
    async getCurrentUser(session: SessionModel): Promise<UserModel> {
        const user = await this.userRepository.findOneById(session.userId);

        if (!user) {
            throw new NotFoundException('指定したIDに紐づくユーザーが見つかりません。');
        }

        return user;
    }
}
