import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

class CreateUserDTO {
    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    @MinLength(1)
    firstname: string;

    @IsString()
    @MaxLength(20)
    lastname: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    password: string;

    @IsString()
    phone: string;

    is_active: boolean;
}

export default CreateUserDTO;
