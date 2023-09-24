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

    @ManyToMany(() => Company)
    @JoinTable({ name: 'company_user_access' })
    companies: Company[];


    @OneToMany(() => CompanyUserAccess, (access) => access.user)
    userAccess: CompanyUserAccess[];
}
