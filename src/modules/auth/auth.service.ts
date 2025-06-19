import { Injectable, ConflictException, UnauthorizedException, Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository:  Repository<User>,
        private readonly jwtService: JwtService, 
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {}

    async register(registerDto: RegisterDto) {
        const existingUser = await this.userRepository.findOne({ where: { email: registerDto.email } });
        if (existingUser) {
            throw new ConflictException('Email is already in use');
        }

        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const user = this.userRepository.create({
            name: registerDto.name,
            email: registerDto.email,
            password: hashedPassword,
        });
        await this.userRepository.save(user);

        const payload = { email: user.email, sub: user.id };
        const token = this.jwtService.sign(payload);
        return { token };
    }

    async login(loginDto: LoginDto) {
        const user = await this.userRepository.findOne({where: { email: loginDto.email }});
        
        if (!user || (await bcrypt.compare(loginDto.password, user.password)) === false) {
            throw new UnauthorizedException('Invalid email or password');
        }

        // await this.cacheManager.set('test', 'test value', 3600000);

        // const value = await this.cacheManager.get('test');
        // console.log('Redis get test:', value);

        const payload = { email: user.email, sub: user.id };
        const token = this.jwtService.sign(payload);
        return { token };
    }
}