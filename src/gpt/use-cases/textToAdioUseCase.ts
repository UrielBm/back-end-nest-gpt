import * as  path from "path";
import * as fs from "fs";
import OpenAI from "openai"

interface Options {
    prompt: string
    voice?: string;
}

export const textToAudioUseCase = async(openai: OpenAI,{prompt,voice}: Options)=> {
    const arrayVoice = {
        'nova': 'nova',
        'alloy': 'alloy',
        'echo': 'echo',
        'fable': 'gable',
        'onyx': 'shimmer'
    }
    const selectedVoice = arrayVoice[voice] ?? 'nova';

    const folderPath = path.resolve(__dirname, './../../../generated/audios/')
    const speechFiles = path.resolve(`${folderPath}/${new Date().getTime()}.mp3`)
    fs.mkdirSync(folderPath,{recursive: true})

    const mp3 = await openai.audio.speech.create({
        model: 'tts-1',
        voice: selectedVoice,
        input: prompt,
        response_format: 'mp3'
    })
    const buffer = Buffer.from(await mp3.arrayBuffer())
    fs.writeFileSync(speechFiles,buffer)

    return speechFiles
}