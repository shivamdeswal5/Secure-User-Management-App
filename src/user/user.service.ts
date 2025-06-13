import { HttpException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';

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
}
