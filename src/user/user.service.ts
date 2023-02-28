import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { type } from 'os';
import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { createUserParameter } from './dto/createUserInput.dto';
import { updateUserInput } from './dto/updateUserInput.dto';

type updateUser = {
    id: number,
    data: Partial<createUserParameter>
}

@Injectable()
export class UserService {

    private logger;
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {
        this.logger = new Logger("User Service")
    }

    getAllUsers(): Promise<UserEntity[]> {
        this.logger.log("Getting Here")
        return this.userRepository.find();
    }

    getUserById(id: number): Promise<UserEntity> {
        return this.userRepository.findOne({ where: { id: id } })
    }

    createUser(createUserInput: createUserParameter) {
        const user = this.userRepository.create({ name: createUserInput.name, email: createUserInput.email, bio: createUserInput.bio, accountType: createUserInput.accountType, hashPassword: createUserInput.hashPassword })
        return this.userRepository.save(user)
    }

    async updateUser(updateUserInput: updateUser): Promise<UserEntity> {
        const user = await this.getUserById(updateUserInput.id);

        return this.userRepository.save({
            ...user,
            ...updateUserInput.data
        });
    }

    async deleteUser(id: number) {
        return await this.userRepository.delete(id);
    }
}
