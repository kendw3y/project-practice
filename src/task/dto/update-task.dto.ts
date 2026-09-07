import { IsIn, IsString } from "class-validator";

export class UpdateTaskDto {
    @IsString()
    @IsIn(['pending', 'done'])
    status!: string;
}