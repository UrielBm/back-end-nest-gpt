import OpenAI from "openai"

interface Options {
    prompt: string
}

export const orthographyCheckUseCase = async(openai: OpenAI,{prompt}: Options)=> {

    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: `Eres un profesor de español, te serán proveídos textos en español con posibles errores ortógraficos y gramaticales, las palabras usadas deben exitir en el diccionario de la Real Academia Española.tu tarea es cogerrir estos textos y retornar soluciones,también debes de dar un porcentaje de aciertos por el usuario. Si no hay errores,escribe un mensaje de felicitaciones.
        deberas contestar en formato json
        Ejemplo de salida: {
            score: number,
            errors: string[] // [error->error solution->solución]
            correctText: string, // texto del usuario corregido con las soluciones.
            menssage: string, // mensaje de felicitaciones puedes usar emojis.
        }` 
        },
        {role: "user", content: prompt}],
        model: "gpt-3.5-turbo",
        temperature: 0.5,
        max_tokens: 75,
        response_format:{
            type: 'json_object'
        }
      });
    
      return JSON.parse(completion.choices[0].message.content)
}