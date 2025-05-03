import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { EmployeeModule } from './employee/employee.module';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './user/domain/entity/user.entity';
import { EmployeeEntity } from './employee/domain/entity/employee.entity';
import { AppLogger } from './shared/logger/app.logger';
import { RequestLoggerMiddleware } from './shared/middlewares/id.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [
          UserEntity,
          EmployeeEntity,
        ],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    EmployeeModule,
    AuthModule,
  ],
  providers: [
    AppLogger,
  ],
  exports:[
    AppLogger,
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*'); // 👈 aplica a todas las rutas
  }
}
