import { IsOptional, IsString  } from "class-validator";

export  class textToAudioDto {
    @IsString()
    prompt: string;
    @IsString()
    @IsOptional()
    voice: string;
}