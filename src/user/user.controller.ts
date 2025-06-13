import { Body, Controller, Param, Patch, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from './user.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Patch('profile/:id')
    @UseInterceptors(FileInterceptor('file'))
    updateProfile(
        @Param('id') id:string, 
        @UploadedFile() file: Express.Multer.File,
        @Body() updateProfileDto:UpdateProfileDto
    ) {
        return this.userService.updateProfile(id,updateProfileDto,file);
    }
}
