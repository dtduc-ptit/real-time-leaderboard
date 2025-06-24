import { CallHandler, ExecutionContext, Injectable, NestInterceptor, RequestTimeoutException } from "@nestjs/common";
import { Observable,timeout, throwError, catchError } from "rxjs";

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
    constructor(private readonly time = 5000) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            timeout(this.time),
            catchError(err => {
                if (err.name === 'TimeoutError') {
                return throwError(() => new RequestTimeoutException());
                }
                return throwError(() => err);
            }),
        )
    }
}