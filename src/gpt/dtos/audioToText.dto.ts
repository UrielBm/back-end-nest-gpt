import {IsOptional, IsString} from 'class-validator';

export class audioToTextDto {
    @IsString()
    @IsOptional()
    readonly prompt: string
}