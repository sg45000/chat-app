import {ArgumentsHost, Catch, HttpException} from '@nestjs/common';
import {GqlExceptionFilter} from '@nestjs/graphql';
import {ValidationException} from 'src/types/error.types';

@Catch(HttpException)
export class HttpExceptionFilter implements GqlExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const response = exception.getResponse();
        if(isValidationErrorObj(response)) {
            return new ValidationException(response.message.join('\n'));
        }
        return exception;
    }
}

/**
 * graphqlのリクエストパラメタバリデーションの型ガード
 * @param arg
 */
function isValidationErrorObj(arg: unknown): arg is ValidationErrorObj {
    return typeof arg === 'object' &&
        arg !== null &&
        typeof (arg as ValidationErrorObj).error === 'string' &&
        typeof (arg as ValidationErrorObj).message === 'object' &&
        typeof (arg as ValidationErrorObj).statusCode === 'number';
}

interface ValidationErrorObj {
    statusCode: number;
    message: string[];
    error: string;
}
