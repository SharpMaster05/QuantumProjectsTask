import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ContextModule } from './context/context.module';
import { ContextMiddleware } from './context/context.middleware'
import { ContextService } from './context/context.service'
import { ScheduleModule } from '@nestjs/schedule'
import { CronService } from './cron/cron.service';

@Module({
  imports: [ContextModule, ScheduleModule.forRoot()],
  providers : [ContextService, CronService]
})
export class AppModule implements NestModule{
  constructor(private readonly service : ContextService){}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ContextMiddleware).forRoutes('*');  
  }
}
