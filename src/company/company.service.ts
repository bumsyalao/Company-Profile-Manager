import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './company.entity/company.entity';
import { CreateCompanyDto, UpdateCompanyDto } from './company.dto/company.dto';

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(Company)
        private readonly companyRepository: Repository<Company>,
    ) { }

    async createCompany(createCompanyDto: CreateCompanyDto): Promise<Company> {
        const company = this.companyRepository.create(createCompanyDto);
        return this.companyRepository.save(company);
    }

    async findOneCompany(id: number): Promise<Company> {
        try {
            const company = await this.companyRepository.find({
                where: { id },
                relations: ['users']
            })

            if (!company[0]) {
                throw new NotFoundException('Company not found');
            }
            return company[0];
        } catch (err) {
            throw new NotFoundException(err.message)
        }

    }
    async updateCompany(id: number, updateCompanyDto: UpdateCompanyDto): Promise<Company> {
        try {
            const company = await this.companyRepository.findOne({ where: { id } });
            if (!company) {
                throw new NotFoundException('Company not found');
            }
            Object.assign(company, updateCompanyDto);

            return this.companyRepository.save(company);
        } catch (err) {
            throw new NotFoundException(err.message)
        }
    }

    async removeCompany(id: number): Promise<void> {
        try {
            const company = await this.companyRepository.findOne({ where: { id } });
            if (!company) {
                throw new NotFoundException('Company not found');
            }

            await this.companyRepository.remove(company);
        }
        catch (err) {
            throw new NotFoundException(err.message)
        }
    }
}