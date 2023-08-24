import { DatabaseModule } from '@app/common';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
    imports: [DatabaseModule],
    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule {}
