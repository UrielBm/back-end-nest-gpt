import * as fs from 'fs';
import OpenAI from 'openai';

interface options {
    audio: Express.Multer.File
    prompt?: string
}

export const audioToTextUseCase = async(openai:OpenAI,{audio,prompt}: options) => {
   const response = await openai.audio.transcriptions.create({
    model: "whisper-1",
    file: fs.createReadStream(audio.path),
    prompt: prompt,
    language: 'es',
    response_format: 'json'
   })
   return response
}