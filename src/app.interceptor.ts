import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AppInterceptor implements NestInterceptor {

    public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        return next.handle().pipe(
            catchError(error => {

                new Logger('Interceptor').error({ args: context.getArgs()[0], ...error });

                throw error;
            })
        );
    }
}