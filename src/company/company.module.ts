import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { Company } from './company.entity/company.entity';
import { CompanyUserAccess } from './company.entity/company-user-access.entity';
import { CompanyUserAccessService } from './company-user-access.service';
import { User } from '../users/user.entity/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Company, CompanyUserAccess, User])],
  controllers: [CompanyController],
  providers: [CompanyService, CompanyUserAccessService],
})
export class CompanyModule { }
