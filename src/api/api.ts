import { DetectedText, HTTPClientType, SupportedLanguage, TranslateText } from '../types/types'

const HTTPClient = (): HTTPClientType => {
  const baseURL = process.env.REACT_APP_URL as string
  const headers = {
    'content-type': 'application/json',
    'X-RapidAPI-Key': process.env.REACT_APP_API as string,
    'X-RapidAPI-Host': 'translate-language.p.rapidapi.com',
  }

  async function fetchJSON(
    endpoint: string,
    options = {},
  ): Promise<TranslateText | DetectedText | SupportedLanguage> {
    const response = await fetch(baseURL + endpoint, {
      ...options,
      headers,
    })

    const data = (await response.json()) as TranslateText | DetectedText | SupportedLanguage

    return data
  }

  const POST = async (endpoint: string, value: string): Promise<any> => {
    return await fetchJSON(endpoint, {
      method: 'POST',
      body: `{"text":"${value}"}`,
    })
  }

  const GET = async (endpoint: string): Promise<any> => {
    return await fetchJSON(endpoint, {
      method: 'GET',
    })
  }

  return { POST, GET }
}

export default HTTPClient
