import { IsString } from "class-validator";

export  class translateDto {
    @IsString()
    prompt: string;
    @IsString()
    lang: string;
}