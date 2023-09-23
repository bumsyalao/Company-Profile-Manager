
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/user.entity/user.entity';
import { Company } from './company.entity';

@Entity()
export class CompanyUserAccess {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.companyUserAccess)
    user: User;

    @ManyToOne(() => Company, (company) => company.companyUserAccess)
    company: Company;

    @Column()
    accessLevel: string;
}
