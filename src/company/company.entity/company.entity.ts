import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
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

    @ManyToMany(() => User)
    @JoinTable({ name: 'company_user_access' })
    users: User[];
    companyUserAccess: CompanyUserAccess[];
}
