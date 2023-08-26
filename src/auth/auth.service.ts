import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CreateUserDTO from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import {
    comparedPassword,
    hashPassword,
    jwtPayload,
} from '@app/common/utils/jwt';
import GetUserByEmailPasswordDTO from './dto/get-user-by-email-password';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService,
    ) {}

    async signUp(createUserDTO: CreateUserDTO): Promise<void> {
        const { firstname, lastname, email, password, phone, is_active } =
            createUserDTO;
        const hashedPassword = await hashPassword(password);
        const newUser = this.usersRepository.create({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            phone,
            is_active,
        });
        try {
            await this.usersRepository.save(newUser);
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException(
                    'email or phone number already taken',
                );
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async login(
        getUserByEmailPasswordDTO: GetUserByEmailPasswordDTO,
    ): Promise<{ accessToken: string }> {
        const { email, password } = getUserByEmailPasswordDTO;
        const user = await this.usersRepository.findOne({
            where: {
                email: email,
            },
        });
        if (user && comparedPassword(password, user.password)) {
            const payload: jwtPayload = { email };
            const accessToken: string = await this.jwtService.sign(payload);
            return { accessToken };
        } else if (!user) {
            throw new NotFoundException('user not registered');
        } else {
            throw new UnauthorizedException();
        }
    }
}
