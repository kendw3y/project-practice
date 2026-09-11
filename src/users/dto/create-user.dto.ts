import { IsEmail, IsString, MinLength } from "class-validator"
import {Transform} from "class-transformer"

export class CreateUserDto {
    @Transform(({value})=>value.trim())
    @IsString()
    @MinLength(1)
    name!:string

    @IsEmail()
    email!:string

    @Transform(({value})=>value.trim())
    @IsString()
    @MinLength(8)
    password!:string
}
