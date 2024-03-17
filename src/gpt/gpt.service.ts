import { Injectable } from '@nestjs/common';
import { orthographyCheckUseCase } from './use-cases';
import { orthographyDto } from './dtos';
import OpenAI from 'openai';

@Injectable()
export class GptService {

private  openai = new OpenAI({
    apiKey: process.env.GPT_API_KEY
});

orthographyCheck = async(dto:orthographyDto) => {
    return await orthographyCheckUseCase(this.openai,{prompt: dto.prompt});
}
}
