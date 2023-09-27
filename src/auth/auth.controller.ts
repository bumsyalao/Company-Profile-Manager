import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Get, Req } from '@nestjs/common';
import { Request } from 'express';
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


    @Get('user-details')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('jwt'))
    async getUserDetails(@Req() req: Request): Promise<UserDto> {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        const userDetails = await this.authService.getUserDetails(token);
        return userDetails;
    }
}