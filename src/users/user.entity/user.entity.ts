import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Company } from '../../company/company.entity/company.entity';
import { CompanyUserAccess } from '../../company/company.entity/company-user-access.entity';
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @ManyToMany(() => Company, (company) => company.companyUsers)
    @JoinTable()
    companies: Company[];


    @OneToMany(() => CompanyUserAccess, (access) => access.userDetails)
    userAccess: CompanyUserAccess[];
}
