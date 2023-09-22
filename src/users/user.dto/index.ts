import { IsString, IsEmail, MinLength } from 'class-validator';

export class UserDto {
    @IsString()
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;
}




