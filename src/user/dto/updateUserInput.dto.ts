import { IsNotEmpty } from "class-validator";
import { createUserParameter } from "./createUserInput.dto";

export class updateUserInput extends createUserParameter {
    @IsNotEmpty()
    id: string
}