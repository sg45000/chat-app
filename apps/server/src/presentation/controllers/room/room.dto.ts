import {Field, ObjectType} from '@nestjs/graphql';
import {RoomModel} from '../../../domain/models/room/room.model';

@ObjectType()
export class RoomResponse {
    constructor(room: RoomModel) {
        this.id = room.id.value;
        this.name = room.name.value;
    }
    @Field()
    readonly id: string;

    @Field()
    readonly name: string;
}
