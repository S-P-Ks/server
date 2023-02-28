import { Body, Injectable } from "@nestjs/common";
import { ForbiddenException, NotAcceptableException, NotFoundException } from "@nestjs/common/exceptions";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: "email",
        })
    }

    async validate(email: string, password: string, username: string) {
        const user = await this.authService.getUser(email);
        if (!user) {
            throw new NotFoundException()
        }

        const equalPass = this.authService.comparePassword(password, user.hashPassword);

        if (!equalPass) {
            throw new ForbiddenException()
        }
        const { hashPassword, ...result } = user;
        return result;
    }
}