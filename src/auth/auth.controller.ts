import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserDto } from '../users/user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    async signUp(@Body() createUserDto: UserDto): Promise<{ accessToken: string }> {
        return this.authService.signUp(createUserDto);
    }

    @Post('signin')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('local'))
    async signIn(@Body() body: { username: string; password: string }): Promise<{ accessToken: string }> {
        return this.authService.validateUser(body.username, body.password);

    }
}