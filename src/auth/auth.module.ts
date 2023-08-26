import { DatabaseModule } from '@app/common';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { UsersRepository } from './repository/user.repository';
import { User } from './entity/user.entity';
import { JWTSecretKey } from '@app/common/utils/jwt';
// import { TypeOrmExModule } from '@app/common/database/typeorm-ex.module';

@Module({
    imports: [
        DatabaseModule,
        // TypeOrmExModule.forCustomRepository([UsersRepository]),
        TypeOrmModule.forFeature([User]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: JWTSecretKey,
            signOptions: {
                expiresIn: 3600,
            },
        }),
    ],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
