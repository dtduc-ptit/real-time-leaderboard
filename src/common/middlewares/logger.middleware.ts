import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';

@Injectable()

export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        // log request
        console.log(`Request: ${req.method} ${req.originalUrl}`);
        if(Object.keys(req.body).length) {
            console.log('Request body: ', req.body);
        }

        // log Response
        const oldSend = res.send;
        res.send = function (body) {
            console.log('Response body:', body);
            return oldSend.call(this, body);
        };

        next();
    }   
}