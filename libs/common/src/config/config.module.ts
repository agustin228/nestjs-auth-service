import { Module } from '@nestjs/common';
import {
    ConfigService,
    ConfigModule as NestConfigModule,
} from '@nestjs/config';
import { configValidationSchema } from './config.schema';

@Module({
    imports: [
        NestConfigModule.forRoot({
            envFilePath: [`.env.stage.${process.env.STAGE}`, '.env.stage.dev'],
            validationSchema: configValidationSchema,
        }),
    ],
    providers: [ConfigService],
    exports: [ConfigService],
})
export class ConfigModule {}
