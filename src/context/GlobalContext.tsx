import React, { createContext, useState } from 'react'
import { getDetectedLanguage, getSupportedLanguages, getTranslate } from '../api/api'
import { LanguageCode } from '../types/types'

export const GlobalContext = createContext({
  translatedText: '',
  supportedLanguage: [] as LanguageCode[],
  fromLanguage: '',
  toLanguage: '',
  error: '' as unknown,
  translate: (value: string, fromLanguage: string, toLanguage: string) => {
    // change contex data
  },
  getSupportedLanguagesContext: () => {
    // change contex data
  },
  changeLanguageContext: (fromLanguage: string, toLanguage: string) => {
    // change context data
  },
})

interface Props {
  children?: React.ReactNode
}

export const GlobalContextProvider: React.FC<Props> = ({ children }) => {
  const [translatedText, setTranslatedText] = useState('')
  const [supportedLanguage, setSupportedLanguage] = useState([] as LanguageCode[])
  const [fromLanguage, setFromLanguage] = useState('')
  const [toLanguage, setToLanguage] = useState('')
  const [error, setError] = useState('' as unknown)

  const getTranslateContext = async (
    value: string,
    fromLanguage: string,
    toLanguage: string,
  ): Promise<void> => {
    try {
      const translate = await getTranslate(value, fromLanguage, toLanguage)
      if (translate.message !== 'Successful') {
        throw new Error('Required')
      }
      setTranslatedText(translate.data.text)
    } catch (err: unknown) {
      setError(err)
    }
  }
  const getDetectedLanguageContext = async (value: string): Promise<string | undefined> => {
    try {
      const detect = await getDetectedLanguage(value)
      if (detect.message !== 'Successful') {
        throw new Error('Not detect language')
      }
      setFromLanguage(detect.data.language)
      return detect.data.language
    } catch (err: unknown) {
      setError(err)
    }
  }
  const getSupportedLanguagesContext = async (): Promise<void> => {
    try {
      const languages = await getSupportedLanguages()
      if (languages.message !== 'Successful') {
        throw new Error('Not found languages')
      }
      setSupportedLanguage(languages.data)
    } catch (err: unknown) {
      setError(err)
    }
  }
  const translate = async (
    value: string,
    fromLanguage: string,
    toLanguage: string,
  ): Promise<void> => {
    if (!fromLanguage) {
      const res = await getDetectedLanguageContext(value)
      await getTranslateContext(value, res ?? '', toLanguage)
    } else {
      await getTranslateContext(value, fromLanguage, toLanguage)
    }
  }

  const changeLanguageContext = (fromLanguage: string, toLanguage: string): void => {
    setFromLanguage(fromLanguage)
    setToLanguage(toLanguage)
  }

  const providerValue = {
    translatedText,
    supportedLanguage,
    translate,
    getSupportedLanguagesContext,
    changeLanguageContext,
    fromLanguage,
    toLanguage,
    error,
  }
  return <GlobalContext.Provider value={providerValue}> {children} </GlobalContext.Provider>
}
