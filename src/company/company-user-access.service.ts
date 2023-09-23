import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CompanyUserAccess } from './company.entity/company-user-access.entity';
import { User } from '../users/user.entity/user.entity';
import { Company } from './company.entity/company.entity';

@Injectable()
export class CompanyUserAccessService {
    constructor(
        private readonly userRepository: Repository<User>,
        private readonly companyRepository: Repository<Company>,
        private readonly companyUserAccessRepository: Repository<CompanyUserAccess>,
    ) { }

    async grantAccessToUser(userId: User['id'], companyId: Company['id'], accessLevel: string): Promise<void> {
        try {
            const user = await this.userRepository.findOne({ where: { id: userId } });
            if (!user) {
                throw new NotFoundException('User not found');
            }

            const company = await this.companyRepository.findOne({ where: { id: companyId } });
            if (!company) {
                throw new NotFoundException('Company not found');
            }
            const existingAccess = await this.companyUserAccessRepository.findOne({
                where: { user, company },
            });

            if (existingAccess) {
                throw new ConflictException('User already has access to the company');
            }

            const access = new CompanyUserAccess();
            access.user = user;
            access.company = company;
            access.accessLevel = accessLevel || 'Admin';

            await this.companyUserAccessRepository.save(access);
        } catch (err) {
            throw new NotFoundException(err.message)
        }
    }

    async revokeAccessFromUser(userId: User['id'], companyId: Company['id']): Promise<void> {
        try {
            const user = await this.userRepository.findOne({ where: { id: userId } });
            if (!user) {
                throw new NotFoundException('User not found');
            }

            const company = await this.companyRepository.findOne({ where: { id: companyId } });
            if (!company) {
                throw new NotFoundException('Company not found');
            }

            const access = await this.companyUserAccessRepository.findOne({
                where: { user, company },
            });

            if (!access) {
                throw new NotFoundException('User does not have access to the company');
            }

            await this.companyUserAccessRepository.remove(access);
        } catch (err) {
            throw new NotFoundException(err.message)
        }
    }
}