import {GraphQLSchemaBuilderModule, GraphQLSchemaFactory} from '@nestjs/graphql';
import {printSchema} from 'graphql';
import {NestFactory} from '@nestjs/core';
import {UserResolver} from './presentation/controllers/user/user.resolver';
import {RoomResolver} from './presentation/controllers/room/room.resolver';
import {PostResolver} from './presentation/controllers/post/post.resolver';

async function generateSchema() {
    const app = await NestFactory.create(GraphQLSchemaBuilderModule);
    await app.init();

    const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
    const schema = await gqlSchemaFactory.create([
        RoomResolver,
        UserResolver,
        PostResolver
    ]);
    console.log(printSchema(schema));
}

void generateSchema();
