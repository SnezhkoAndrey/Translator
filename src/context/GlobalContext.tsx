import React, { createContext, useState } from 'react'
import { getDetectedLanguage, getSupportedLanguages, getTranslate } from '../api/api'
import { LanguageCode } from '../types/types'

export const GlobalContext = createContext({
  translatedText: '',
  supportedLanguage: [] as LanguageCode[],
  fromLanguage: '',
  toLanguage: '',
  error: '',
  loading: false,
  loadingSupportedLanguage: false,
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
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingSupportedLanguage, setLoadingSupportesLanguage] = useState(false)

  const getTranslateContext = async (
    value: string,
    fromLanguage: string,
    toLanguage: string,
  ): Promise<void> => {
    try {
      const translate = await getTranslate(value, fromLanguage, toLanguage)
      if (translate.message !== 'Successful') {
        throw new Error('Invalid text')
      }
      setTranslatedText(translate.data.text)
    } catch (err: any) {
      // eslint-disable-next-line
      setError(err.message)
    }
  }
  const getDetectedLanguageContext = async (value: string): Promise<string | undefined> => {
    setLoading(true)
    try {
      const detect = await getDetectedLanguage(value)
      if (detect.message !== 'Successful') {
        throw new Error('Not detect language')
      }
      setFromLanguage(detect.data.language)
      return detect.data.language
    } catch (err: any) {
      // eslint-disable-next-line
      setError(err.message)
    }
    setLoading(false)
  }
  const getSupportedLanguagesContext = async (): Promise<void> => {
    setLoadingSupportesLanguage(true)
    try {
      const languages = await getSupportedLanguages()
      if (languages.message !== 'Successful') {
        throw new Error('Not found languages')
      }
      setSupportedLanguage(languages.data)
    } catch (err: any) {
      // eslint-disable-next-line
      setError(err.message)
    }
    setLoadingSupportesLanguage(false)
  }
  const translate = async (
    value: string,
    fromLanguage: string,
    toLanguage: string,
  ): Promise<void> => {
    setLoading(true)
    try {
      if (!value && !toLanguage) {
        throw new Error('You have required field')
      } else {
        if (!fromLanguage) {
          const res = await getDetectedLanguageContext(value)
          await getTranslateContext(value, res ?? '', toLanguage)
        } else {
          await getTranslateContext(value, fromLanguage, toLanguage)
        }
      }
    } catch (err: any) {
      // eslint-disable-next-line
      setError(err.message)
    }
    setLoading(false)
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
    loading,
    loadingSupportedLanguage,
  }
  return <GlobalContext.Provider value={providerValue}> {children} </GlobalContext.Provider>
}
