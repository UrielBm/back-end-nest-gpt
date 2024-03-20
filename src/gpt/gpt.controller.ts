import { Body, Controller, FileTypeValidator, Get, HttpStatus, MaxFileSizeValidator, Param, ParseFilePipe, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { GptService } from './gpt.service';
import { ProsConsDiscusserDto, audioToTextDto , orthographyDto, textToAudioDto, translateDto } from './dtos';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import {diskStorage} from "multer"
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
  @Post("text-to-audio")
  async textToAudio(@Body() dtoDataTextToAdio: textToAudioDto,@Res() res: Response){
    const filePath = await this.gptService.textToAudio(dtoDataTextToAdio)
    res.setHeader('Content-Type', 'audio/mp3');
    res.status(HttpStatus.OK);
    res.sendFile(filePath)
  }
  @Get("text-to-audio/:fieldId")
  async textToAudioGetter(@Param('fieldId')id: string,@Res() res: Response){
    const filePath = await this.gptService.textToAudioGetter(id)
    res.setHeader('Content-Type', 'audio/mp3');
    res.status(HttpStatus.OK);
    res.sendFile(filePath)
  }
  @Post("audio-to-text")
  @UseInterceptors(
    FileInterceptor('audio', {
      storage: diskStorage({
        destination: "./generated/uploads",
        filename: (req, file, callback) => {
          const fileExtension = file.originalname.split('.').pop();
          const fileName = `${new Date().getTime()}.${fileExtension}`;
          return callback(null,fileName);
        },
      })
    })
  )
  async audioToText(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({maxSize: 1000 * 1024 * 5, message: `El archivo es más grande de 5MB`}),
          new FileTypeValidator({fileType: 'audio/*'})
        ]
      })
    ) audio: Express.Multer.File, @Body() dtoDataAudioToText: audioToTextDto
  ){
    return await this.gptService.audioToText(audio,dtoDataAudioToText)
  }
}
