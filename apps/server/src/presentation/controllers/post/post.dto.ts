import {Field, ObjectType, InputType} from '@nestjs/graphql';
import {PostModel} from '../../../domain/models/post/post.model';

@ObjectType()
export class PostResponse {
    constructor(post: PostModel) {
        this.id = post.id.value;
        this.message = post.message.value;
        this.ownerId = post.owner.value;
        // this.replyTo = post.replyTo?.value || null;
    }
    @Field()
    readonly id: string;

    @Field()
    readonly message: string;

    @Field()
    readonly ownerId: string;

    @Field(type => String, {nullable: true})
    readonly replyTo: string | null;
}

@InputType()
export class AddPostRequest {
    @Field()
    readonly message: string;

    @Field(type => String, {nullable: true})
    readonly replyTo: string | null;

    @Field()
    readonly roomId: string;
}
