import axios from 'axios'
import { DetectedText, SupportedLanguage, TranslateText } from '../types/types'

export async function getTranslate(
  value: string,
  fromLanguage: string,
  toLanguage: string,
): Promise<TranslateText> {
  const response = await fetch(
    `https://translate-language.p.rapidapi.com/translate?to_language=${toLanguage}&from_language=${fromLanguage}`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': process.env.REACT_APP_API as string,
        'X-RapidAPI-Host': 'translate-language.p.rapidapi.com',
      },
      body: `{"text":"${value}"}`,
    },
  )
  const data = (await response.json()) as TranslateText
  return data
}

export async function getDetectedLanguage(value: string): Promise<DetectedText> {
  const response = await fetch('https://translate-language.p.rapidapi.com/detect-language', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': process.env.REACT_APP_API as string,
      'X-RapidAPI-Host': 'translate-language.p.rapidapi.com',
    },
    body: `{"text":"${value}"}`,
  })
  const data = (await response.json()) as DetectedText
  return data
}

export async function getSupportedLanguages(): Promise<SupportedLanguage> {
  const options = {
    method: 'GET',
    url: 'https://translate-language.p.rapidapi.com/supported-languages',
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_API,
      'X-RapidAPI-Host': 'translate-language.p.rapidapi.com',
    },
  }
  const response = await axios.request(options)
  return response.data as SupportedLanguage
}
