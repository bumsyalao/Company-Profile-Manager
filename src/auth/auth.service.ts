import { Injectable, NotFoundException, ConflictException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity/user.entity';
import { UserDto } from '../users/user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) { }

    async signUp(createUserDto: UserDto): Promise<{ accessToken: string }> {
        const { username, email, password } = createUserDto;

        // Check if the user already exists
        const existingUser = await this.userRepository.findOne({ where: [{ username }, { email }] });

        if (existingUser) {
            throw new ConflictException('Username or email is already taken');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = this.userRepository.create({ username, email, password: hashedPassword });
        await this.userRepository.save(newUser);

        // Generate and return a JWT token for authentication
        const accessToken = this.jwtService.sign({ sub: newUser.id });

        return { accessToken };
    }

    async validateUser(username: string, password: string): Promise<{ accessToken: string }> {
        try {
            const user = await this.userRepository.findOne({ where: { username } });

            if (!user) {
                throw new NotFoundException('User not found');
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                throw new NotFoundException('Invalid password');
            }

            // Generate and return a JWT token for authentication
            const accessToken = this.jwtService.sign({ sub: user.id });
            return { accessToken };

        } catch (err) {
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}
