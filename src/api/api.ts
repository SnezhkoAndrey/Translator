import axios from 'axios'
import { DetectedText, HTTPClientType, SupportedLanguage, TranslateText } from '../types/types'

const HTTPClient = (): HTTPClientType => {
  const baseURL = 'https://translate-language.p.rapidapi.com/'
  const headers = {
    'content-type': 'application/json',
    'X-RapidAPI-Key': process.env.REACT_APP_API as string,
    'X-RapidAPI-Host': 'translate-language.p.rapidapi.com',
  }

  async function axiosRequest(endpoint: string, option = {}): Promise<SupportedLanguage> {
    const options = {
      ...option,
      url: baseURL + endpoint,
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_API,
        'X-RapidAPI-Host': 'translate-language.p.rapidapi.com',
      },
    }
    const response = await axios.request(options)
    return response.data as SupportedLanguage
  }

  async function fetchJSON(endpoint: string, options = {}): Promise<TranslateText | DetectedText> {
    const response = await fetch(baseURL + endpoint, {
      ...options,
      headers: headers,
    })

    const data = (await response.json()) as TranslateText | DetectedText

    return data
  }

  const POST = async (endpoint: string, value: string): Promise<TranslateText | DetectedText> => {
    return await fetchJSON(endpoint, {
      method: 'POST',
      body: `{"text":"${value}"}`,
    })
  }

  const GET = async (endpoint: string): Promise<SupportedLanguage> => {
    return await axiosRequest(endpoint, {
      method: 'GET',
    })
  }

  return { POST, GET }
}

export default HTTPClient
