import { Injectable } from '@nestjs/common';
import { orthographyCheckUseCase, prosConsDicusserUseCase, translateUseCase } from './use-cases';
import { ProsConsDiscusserDto, orthographyDto, translateDto } from './dtos';
import OpenAI from 'openai';

@Injectable()
export class GptService {

private  openai = new OpenAI({
    apiKey: process.env.GPT_API_KEY
});

orthographyCheck = async(dto:orthographyDto) => {
    return await orthographyCheckUseCase(this.openai,{prompt: dto.prompt});
}
prosConsDicusser = async(data:ProsConsDiscusserDto)=> {
    return await  prosConsDicusserUseCase(this.openai,{prompt: data.prompt})
}
translateText = async(dto: translateDto) => {
    return await translateUseCase(this.openai,{prompt: dto.prompt, lang: dto.lang})
}
}
