import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/user/user.repository';
import { loginDto } from './dto/login.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/entities/user.entity';
import { OTPType } from 'src/otp/type/otp-type';
import { OtpService } from 'src/otp/otp.service';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly otpService: OtpService,
        private readonly jwtService: JwtService,
        private readonly mailerService: MailerService,
        private readonly configService: ConfigService
    ){}

    async signup(dto:UserDto){
        const {email,password,firstName,lastName} = dto;
        const existingUser = await this.userRepository.findOne({where:{email:email}});
        if(existingUser){
            throw new HttpException('User already exists',409);
        }
        const newUser = this.userRepository.create({
            email,
            password,
            firstName,
            lastName
        })
            
        await this.userRepository.save(newUser);
        return this.emailVerification(newUser,OTPType.OTP);
    }

    async emailVerification(user:User,otpType:OTPType){
        const token = await this.otpService.generateToken(user,otpType);
        const emailData = {
            to:user.email,
            from: process.env.EMAIL_USER,
            subject: 'OTP For Verification',
            html: 
            `<p>
                Dear ${user.email},<br>Thank you for signing up with us. To verify your email. Please enter the following One Time Password (OTP): <b>${token}</b><br>
                This OTP is valid for 5 minutes from the receipt of this email.
                <br>Best regards,<br>Zenmonk
            </p>`
        }  
        
        return await this.mailerService.sendMail(emailData);
    }

}
