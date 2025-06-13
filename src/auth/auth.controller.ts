import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { loginDto } from './dto/login.dto'
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { UserDto } from 'src/user/dto/user.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @Post('signup')
    async login(@Body() userDto :UserDto){
        await this.authService.signup(userDto);
        return {
            message:'User Registered Successfully, OTP Sent to your mail. Login to verify your account'
        }
    }

}

