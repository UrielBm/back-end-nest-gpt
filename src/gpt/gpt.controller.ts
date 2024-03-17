import { Body, Controller, Post } from '@nestjs/common';
import { GptService } from './gpt.service';
import { orthographyDto } from './dtos';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}
  @Post('orthography-ckeck')
  orthographyCheck(@Body() body:  orthographyDto){
    return this.gptService.orthographyCheck(body)
  }
}
