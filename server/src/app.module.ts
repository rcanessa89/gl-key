import { Module, CacheModule, CacheInterceptor } from '@nestjs/common';
import { ClassProvider } from '@nestjs/common/interfaces';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MailerModule } from '@nest-modules/mailer';
import { ServicesModule } from './services/services.module';
import { DatabaseModule } from './database/database.module';
import { ModulesModule } from './modules/modules.module';
import { mailerConfig } from './mailer-config';

const cacheProvider: ClassProvider = {
  provide: APP_INTERCEPTOR,
  useClass: CacheInterceptor,
};

@Module({
  imports: [
    CacheModule.register(),
    ServicesModule,
    DatabaseModule,
    ModulesModule,
    MailerModule.forRoot(mailerConfig)
  ],
})
export class AppModule {}
