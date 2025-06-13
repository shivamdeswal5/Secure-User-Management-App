import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: UserRepository,
      useFactory: (dataSource: DataSource) => {
        return dataSource.getRepository(User).extend(UserRepository.prototype);
      },
      inject: [DataSource],
    },
  ],
  exports: [UserRepository]
})
export class UserModule { }
