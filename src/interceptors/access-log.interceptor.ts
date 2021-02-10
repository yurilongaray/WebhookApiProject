import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { catchError, finalize, timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {

    public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        return next
            .handle()
            .pipe(
                finalize(async () => {

                    await 'save access log'
                })
            );
    }
}