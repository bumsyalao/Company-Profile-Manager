import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyUserAccess } from './company.entity/company-user-access.entity';
import { User } from '../users/user.entity/user.entity';
import { Company } from './company.entity/company.entity';

@Injectable()
export class CompanyUserAccessService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Company)
        private readonly companyRepository: Repository<Company>,
        @InjectRepository(CompanyUserAccess)
        private readonly companyUserAccessRepository: Repository<CompanyUserAccess>,
    ) { }

    async grantAccessToUser(companyId: Company['id'], userId: User['id'], accessLevel: string): Promise<void> {
        try {
            const company = await this.companyRepository.findOne({ where: { id: companyId } });
            const user = await this.userRepository.findOne({ where: { id: userId } });

            if (!company || !user) {
                throw new NotFoundException('Company or user not found.');
            }
            const existingAccess = await this.companyUserAccessRepository.findOne({
                where: { userDetails: user, companyDetails: company },
            });

            if (existingAccess) {
                throw new ConflictException(`User already has ${accessLevel} access to the company`);
            }

            const access = new CompanyUserAccess();
            access.userDetails = user;
            access.companyDetails = company;
            access.accessLevel = accessLevel || 'Admin';

            await this.companyUserAccessRepository.save(access);
        } catch (err) {
            throw new NotFoundException(err.message)
        }
    }

    async revokeAccessFromUser(companyId: Company['id'], userId: User['id']): Promise<void> {
        try {
            const company = await this.companyRepository.findOne({ where: { id: companyId } });
            const user = await this.userRepository.findOne({ where: { id: userId } });

            if (!company || !user) {
                throw new NotFoundException('Company or user not found.');
            }

            const access = await this.companyUserAccessRepository.findOne({
                where: { userDetails: user, companyDetails: company },
            });

            if (!access) {
                throw new NotFoundException('User does not have ${accessLevel}access to the company');
            }

            await this.companyUserAccessRepository.remove(access);
        } catch (err) {
            throw new NotFoundException(err.message)
        }
    }
}