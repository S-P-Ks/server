import { InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

@InputType()
export class createUserParameter {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    accountType: string

    @IsNotEmpty()
    @IsString()
    bio: string

    @IsNotEmpty()
    @IsString()
    hashPassword: string
}