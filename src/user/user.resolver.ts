import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { JWTStrategyGuard } from 'src/auth/guards/jwtGuard';
import { UserEntity } from 'src/entity/user.entity';
import { createUserParameter } from './dto/createUserInput.dto';
import { UserService } from './user.service';

@Resolver("User")
export class UserResolver {
    constructor(private readonly userService: UserService, private readonly authService: AuthService, private readonly jwtService: JwtService) { }

    @UseGuards(JWTStrategyGuard)
    @Query()
    getALLUsers(): Promise<UserEntity[]> {
        return this.userService.getAllUsers();
    }

    @UseGuards(JWTStrategyGuard)
    @Query()
    getUserByID(@Args("id", { type: () => Int }) id: number): Promise<UserEntity> {
        return this.userService.getUserById(id);
    }

    @Mutation()
    async createUser(@Args("name") name: string, @Args("password") password: string, @Args("email") email: string, @Args("accountType") accountType: string, @Args("bio") bio: string, @Context("res") res): Promise<UserEntity> {
        const hashPass = await this.authService.generateHashPass(password);
        var user = await this.userService.createUser({ name: name, email: email, accountType: accountType, bio: bio, hashPassword: hashPass });
        const token = await this.jwtService.sign({ id: user.id, name: user.name, email: user.email, bio: user.bio, profilePhoto: user.profilePhoto, });
        res.cookie("cookieToken", token);
        return user;
    }

    @UseGuards(JWTStrategyGuard)
    @Mutation()
    updateUser(@Args("id", { type: () => Int }) id: number, @Args("name") name: string, @Args("email") email: string, @Args("accountType") accountType: string, @Args("bio") bio: string): Promise<UserEntity> {
        return this.userService.updateUser({ id: id, data: { name: name, email: email, accountType: accountType, bio: bio } });
    }

    @UseGuards(JWTStrategyGuard)
    @Mutation()
    async deleteUser(@Args("id", { type: () => Int }) id: number) {
        try {
            await this.userService.deleteUser(id);
            return { deleted: true }
        } catch (error) {
            return { deleted: false }
        }
    }
}