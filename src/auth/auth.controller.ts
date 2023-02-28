import { Controller, Post, UseGuards } from '@nestjs/common';
import { Req, Res } from '@nestjs/common/decorators';
import { Args, Context, Mutation, Query, Resolver, } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { LocalStrategyGuard } from './guards/localGuard';

@Resolver('auth')
export class AuthResolver {
    constructor(private readonly authService: AuthService, private readonly jwtService: JwtService) { }

    @UseGuards(LocalStrategyGuard)
    @Mutation()
    async login(@Args("email") email: string, @Args("password") password: string, @Context() ctx) {
        const user = ctx.user;
        console.log(user)
        return {
            access_token: this.jwtService.sign(user, { expiresIn: 3600 }),
            user
        }
    }
}
