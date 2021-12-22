import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from '@nestjs/common';
import {NestExpressApplication} from '@nestjs/platform-express';
import {join} from 'path';
/**
 * return static files path
 */
const _staticFilesPathGen = (): string => {
    return ~__dirname.indexOf('/server/dist/src')
        ? join(__dirname, '..', '..', '..', 'front', 'dist')
        : join(__dirname, '..', '..', 'front', 'dist');
};
async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const staticFilesPath: string = _staticFilesPathGen();
    console.log(`staticFilesPath: ${staticFilesPath}`);
    app.useStaticAssets(staticFilesPath);

    app.useGlobalPipes(new ValidationPipe({}));
    const port = process.env.PORT || 3030;
    await app.listen(port);
    console.log(`server listen: port ${port}`);
}
void bootstrap();
