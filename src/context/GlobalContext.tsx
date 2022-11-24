import React, { createContext, useState } from 'react'
import { getDetectedLanguage, getSupportedLanguages, getTranslate } from '../api/api'
import { LanguageCode } from '../types/types'

export const GlobalContext = createContext({
  translatedText: '',
  supportedLanguage: [] as LanguageCode[],
  fromLanguage: '',
  toLanguage: '',
  value: '',
  error: '' as unknown,
  translate: () => {
    // change contex data
  },
  getSupportedLanguagesContext: () => {
    // change contex data
  },
  changeToLanguage: (value: string) => {
    // change toLanguage
  },
  changeFromLanguage: (value: string) => {
    // change fromLanguage
  },
  changeValue: (value: string) => {
    // change fromLanguage
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
  const [value, setValue] = useState('')
  const [error, setError] = useState('' as unknown)

  const getTranslateContext = async (
    value: string,
    fromLanguage: string,
    toLanguage: string,
  ): Promise<void> => {
    try {
      const translate = await getTranslate(value, fromLanguage, toLanguage)
      setTranslatedText(translate.data.text)
      if (translate.message !== 'Successful') {
        setError(translate.message)
      }
    } catch (err: unknown) {
      setError(err)
    }
  }
  const getDetectedLanguageContext = async (value: string): Promise<void> => {
    try {
      const detect = await getDetectedLanguage(value)
      setFromLanguage(detect.data.language)
      if (detect.message !== 'Successful') {
        setError(detect.message)
      }
    } catch (err: unknown) {
      setError(err)
    }
  }
  const getSupportedLanguagesContext = async (): Promise<void> => {
    try {
      const languages = await getSupportedLanguages()
      setSupportedLanguage(languages.data)
      if (languages.message !== 'Successful') {
        setError(languages.message)
      }
    } catch (err: unknown) {
      setError(err)
    }
  }
  const translate = async (): Promise<void> => {
    if (!fromLanguage) {
      await getDetectedLanguageContext(value)
    }
    await getTranslateContext(value, fromLanguage, toLanguage)
  }

  const changeFromLanguage = (value: string): void => {
    setFromLanguage(value)
  }
  const changeToLanguage = (value: string): void => {
    setToLanguage(value)
  }
  const changeValue = (value: string): void => {
    setValue(value)
  }

  const providerValue = {
    translatedText,
    supportedLanguage,
    translate,
    getSupportedLanguagesContext,
    fromLanguage,
    toLanguage,
    changeFromLanguage,
    changeToLanguage,
    value,
    changeValue,
    error,
  }
  return <GlobalContext.Provider value={providerValue}> {children} </GlobalContext.Provider>
}
