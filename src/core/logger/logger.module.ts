import { DynamicModule, MiddlewareConsumer, Module } from '@nestjs/common';
import { LoggerModule as NestLoggerModule } from 'nestjs-pino';
import { randomUUID } from 'node:crypto';
import { LoggerMiddleware } from './logger.middleware';

@Module({})
export class LoggerModule {
  static forRoot(): DynamicModule {
    return {
      module: LoggerModule,
      imports: [
        NestLoggerModule.forRoot({
          pinoHttp: {
            genReqId(req: any, res: any) {
              if (req.id) return req.id;
              let id = req.get('X-Request-Id');
              if (id) return id;
              id = randomUUID();
              res.header('X-Request-Id', id);
              return id;
            },
          },
        }),
      ],
      providers: [],
      exports: [],
    };
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
