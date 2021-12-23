import {GraphQLSchemaBuilderModule, GraphQLSchemaFactory} from '@nestjs/graphql';
import {printSchema} from 'graphql';
import {NestFactory} from '@nestjs/core';
import {UserResolver} from './presentation/controllers/user/user.resolver';
import {RoomResolver} from './presentation/controllers/room/room.resolver';
import {PostResolver} from './presentation/controllers/post/post.resolver';
import * as fs from 'fs';
import {join} from 'path';
async function generateSchema() {
    const app = await NestFactory.create(GraphQLSchemaBuilderModule);
    await app.init();

    const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
    const schema = await gqlSchemaFactory.create([
        RoomResolver,
        UserResolver,
        PostResolver
    ]);
    const schemaText = printSchema(schema);
    fs.writeFile(join(process.cwd(), '..', 'common', 'types', 'schema.graphql'), schemaText, {}, (err) => {
        if(err) {
            console.error(err);
            throw new Error('schemaファイルの作成に失敗しました。');
        }
        console.log('schemaファイルの作成に成功しました。');
    });
}

void generateSchema();
