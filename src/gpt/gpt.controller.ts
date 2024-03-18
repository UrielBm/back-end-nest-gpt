import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { GptService } from './gpt.service';
import { ProsConsDiscusserDto, orthographyDto, translateDto } from './dtos';
import { Response } from 'express';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}
  @Post('orthography-ckeck')
  orthographyCheck(@Body() body:  orthographyDto){
    return this.gptService.orthographyCheck(body)
  }
  @Post("pros-cons-disscusser")
  async prosConsDiscusser(@Body() data: ProsConsDiscusserDto,@Res() res: Response){
    const stream = await this.gptService.prosConsDicusser(data);
    res.setHeader('Content-Type', 'application/json')
    res.status(HttpStatus.OK)
    for await ( const chunk of stream){
      const piece = chunk.choices[0].delta.content || '';
      res.write(piece)
    }
    res.end();
  }
  @Post("translate")
  async translateMethod(@Body() dtoTranslate: translateDto ){
    return this.gptService.translateText(dtoTranslate)
  }
}
