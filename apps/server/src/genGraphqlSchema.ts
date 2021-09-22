import {GraphQLSchemaBuilderModule, GraphQLSchemaFactory} from '@nestjs/graphql';
import {printSchema} from 'graphql';
import {NestFactory} from '@nestjs/core';
import {UserResolver} from './presentation/controllers/user/user.resolver';
async function generateSchema() {
    const app = await NestFactory.create(GraphQLSchemaBuilderModule);
    await app.init();

    const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
    const schema = await gqlSchemaFactory.create([
        UserResolver
    ]);
    console.log(printSchema(schema));
}

void generateSchema();
