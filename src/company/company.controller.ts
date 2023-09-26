import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyUserAccessService } from './company-user-access.service';
import { CreateCompanyDto, UpdateCompanyDto } from './company.dto/company.dto';

@Controller('companies')
export class CompanyController {
    constructor(
        private readonly companyService: CompanyService,
        private readonly companyUserAccessService: CompanyUserAccessService
    ) { }

    @Post()
    create(@Body() createCompanyDto: CreateCompanyDto) {
        return this.companyService.createCompany(createCompanyDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.companyService.findOneCompany(+id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
        return this.companyService.updateCompany(+id, updateCompanyDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.companyService.removeCompany(+id);
    }

    @Post(':id/invite/:userId/:accessLevel')
    inviteUser(
        @Param('id') companyId: string,
        @Param('userId') userId: string,
        @Param('accessLevel') accessLevel: string,
    ) {
        return this.companyUserAccessService.grantAccessToUser(+companyId, +userId, accessLevel);
    }

    @Delete(':id/revoke/:userId')
    revokeAccess(@Param('id') companyId: string, @Param('userId') userId: string) {
        return this.companyUserAccessService.revokeAccessFromUser(+companyId, +userId);
    }
}