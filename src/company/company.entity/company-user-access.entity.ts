
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/user.entity/user.entity';
import { Company } from './company.entity';


@Entity()
export class CompanyUserAccess {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.userAccess)
    userDetails: User;

    @ManyToOne(() => Company, (company) => company.companyAccess)
    companyDetails: Company;

    @Column()
    accessLevel: string;
}
