import { Module } from '@nestjs/common';
import {
    ConfigService,
    ConfigModule as NestConfigModule,
} from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entity/user.entity';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [NestConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                return {
                    host: configService.get('DB_HOST'),
                    port: configService.get('DB_PORT'),
                    username: configService.get('DB_USERNAME'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_NAME'),
                    type: 'postgres',
                    autoLoadEntities: true,
                    entities: [User],
                    logging: true,
                    // synchronize: true,
                };
            },
        }),
    ],
})
export class DatabaseModule {}
