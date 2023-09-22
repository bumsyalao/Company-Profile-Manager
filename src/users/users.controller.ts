import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { UserDto } from './user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    async signUp(@Body() createUserDto: UserDto): Promise<{ accessToken: string }> {
        return this.usersService.signUp(createUserDto);
    }

    @Post('signin')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('local'))
    async signIn(@Body() body: { username: string; password: string }): Promise<{ accessToken: string }> {
        return this.usersService.signIn(body.username, body.password);
    }
}