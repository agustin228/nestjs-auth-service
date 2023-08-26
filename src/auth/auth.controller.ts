import { Body, Controller, Post } from '@nestjs/common';
import CreateUserDTO from '../auth/dto/create-user.dto';
import { AuthService } from './auth.service';
import GetUserByEmailPasswordDTO from './dto/get-user-by-email-password';
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @Post('/signup')
    signUp(@Body() createUserDTO: CreateUserDTO): Promise<void> {
        return this.authService.signUp(createUserDTO);
    }

    @Post('/login')
    login(
        @Body() getUserByEmailPasswordDTO: GetUserByEmailPasswordDTO,
    ): Promise<{ accessToken: string }> {
        return this.authService.login(getUserByEmailPasswordDTO);
    }
}
