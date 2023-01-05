import axios from 'axios'
import { DetectedText, SupportedLanguage, TranslateText, TranslatorApiType } from '../types/types'

export const useTranslatorApi = (): TranslatorApiType => {
  async function postTranslateDetectRequest(
    value: string,
    route: string,
  ): Promise<TranslateText | DetectedText> {
    const response = await fetch(`https://translate-language.p.rapidapi.com/${route}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': process.env.REACT_APP_API as string,
        'X-RapidAPI-Host': 'translate-language.p.rapidapi.com',
      },
      body: `{"text":"${value}"}`,
    })
    const data = (await response.json()) as TranslateText | DetectedText
    return data
  }

  async function getSupportedLanguages(): Promise<SupportedLanguage> {
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

  return { postTranslateDetectRequest, getSupportedLanguages }
}
