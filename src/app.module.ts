import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';


const DB_URL = process.env.DB_URL

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: DB_URL,
        synchronize: true,
        entities: [__dirname + '/**/*.entity{.ts,.js}']
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    CompanyModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
