import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
    ){}

    async findByEmail(email: string): Promise<User> {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        throw new HttpException('User not found', 404);
      }
      return user;
    }

    async updateProfile(id:string, updatedProfileData:UpdateProfileDto, file: Express.Multer.File){
      const user = await this.userRepository.findOne({ where: { id: id } });
      if(!user){
        throw new NotFoundException('User Not Found ..')
      }
    }

}
