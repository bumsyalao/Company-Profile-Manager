import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { User } from '../../users/user.entity/user.entity';
import { CompanyUserAccess } from './company-user-access.entity';

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    size: string;

    @Column()
    type: string;

    @Column()
    industry: string;

    @ManyToMany(() => User, (user) => user.companies)
    @JoinTable()
    companyUsers: User[];

    @OneToMany(() => CompanyUserAccess, (access) => access.companyDetails)
    companyAccess: CompanyUserAccess[];
}
