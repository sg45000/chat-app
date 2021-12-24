import {GetPostsQuery, GetRoomsQuery, LoginMutation, SignupMutation} from './types';

export type OmitResponse<RES> = Omit<RES, '__typename'>;

export type LoginMutationResponse = OmitResponse<LoginMutation['login']>
export type SignupMutationResponse = OmitResponse<SignupMutation['signup']>
export type GetRoomsQueryResponse = OmitResponse<GetRoomsQuery['rooms'][0]>
export type GetPostsQueryResponse = OmitResponse<GetPostsQuery['posts'][0]>
