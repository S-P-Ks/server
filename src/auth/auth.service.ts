import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) { }

    getUser(email: string): Promise<UserEntity> {
        return this.userRepository.findOne({ where: { email: email } })
    }

    comparePassword(password: string, hashedPassword: string): Promise<Boolean> {
        return bcrypt.compare(password, hashedPassword);
    }

    async generateHashPass(password: string) {
        const salt = await bcrypt.genSalt();
        return bcrypt.hash(password, salt);
    }
}
