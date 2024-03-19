import * as  path from "path";
import * as fs from "fs";
import { NotFoundException } from "@nestjs/common";


interface Options {
    id: string
}

export const textToAudioGetterUseCase = async({id}: Options)=> {
    const filePath = path.resolve(__dirname,`./../../../generated/audios/${id}.mp3`);
   const wasFound = fs.existsSync(filePath)
   if(!wasFound) new NotFoundException(`Archivo ${id} not found`);
    return filePath
}