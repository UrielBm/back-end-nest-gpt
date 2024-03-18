import OpenAI from "openai"

interface Options {
    prompt: string
    lang: string;
}

export const translateUseCase = async(openai: OpenAI,{prompt,lang}: Options)=> {

    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: `Traduce el siguiente texto: ${prompt}. al idioma:${lang} y devuelve la respuesta en formato json
        Ejemplo de salida: {
            response: string // resultado de la traducción.
        }` 
        }],
        model: "gpt-3.5-turbo",
        temperature: 0.5,
        max_tokens: 150,
        response_format:{
            type: 'json_object'
        }
      });
    
      return JSON.parse(completion.choices[0].message.content)
}