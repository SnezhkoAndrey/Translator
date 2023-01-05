import React, { createContext, useState } from 'react'
import { useTranslatorApi } from '../api/api'
import { DetectedText, LanguageCode, TranslateText } from '../types/types'

export const GlobalContext = createContext({
  translator: {
    translatedText: '',
    valueText: '',
    supportedLanguage: [] as LanguageCode[],
    fromLanguage: '',
    toLanguage: '',
  },
  error: '',
  loading: {
    loadingTranslate: false,
    loadingSupportedLanguage: false,
  },
  translate: (value: string, fromLanguage: string, toLanguage: string) => {
    // change contex data
  },
  getSupportedLanguagesContext: () => {
    // change contex data
  },
  changeLanguageContext: (
    fromLanguage: string,
    toLanguage: string,
    valueTextarea: string,
    translatedTextarea: string,
  ) => {
    // change context data
  },
})

interface Props {
  children?: React.ReactNode
}

export const GlobalContextProvider: React.FC<Props> = ({ children }) => {
  const { postTranslateDetectRequest, getSupportedLanguages } = useTranslatorApi()

  const [translator, setTranslator] = useState({
    translatedText: '',
    valueText: '',
    supportedLanguage: [] as LanguageCode[],
    fromLanguage: '',
    toLanguage: '',
  })

  const [error, setError] = useState('')

  const [loading, setLoading] = useState({
    loadingTranslate: false,
    loadingSupportedLanguage: false,
  })

  const getTranslateContext = async (
    value: string,
    fromLanguage: string,
    toLanguage: string,
  ): Promise<void> => {
    try {
      const translate = (await postTranslateDetectRequest(
        value,
        `translate?to_language=${toLanguage}&from_language=${fromLanguage}`,
      )) as TranslateText
      if (translate.message !== 'Successful') {
        throw new Error('Invalid text or language to translate is not specified')
      }
      setTranslator((prevState) => ({ ...prevState, translatedText: translate.data.text }))
    } catch (err: any) {
      // eslint-disable-next-line
      setError(err.message)
    }
  }

  const getDetectedLanguageContext = async (value: string): Promise<string | undefined> => {
    setLoading((prevState) => ({ ...prevState, loadingTranslate: true }))
    try {
      const detect = (await postTranslateDetectRequest(value, 'detect-language')) as DetectedText
      if (detect.message !== 'Successful') {
        throw new Error('Not detect language')
      }
      setTranslator((prevState) => ({ ...prevState, fromLanguage: detect.data.language }))
      return detect.data.language
    } catch (err: any) {
      // eslint-disable-next-line
      setError(err.message)
    }
    setLoading((prevState) => ({ ...prevState, loadingTranslate: false }))
  }

  const getSupportedLanguagesContext = async (): Promise<void> => {
    setLoading((prevState) => ({ ...prevState, loadingSupportedLanguage: true }))
    try {
      const languages = await getSupportedLanguages()
      if (languages.message !== 'Successful') {
        throw new Error('Not found languages')
      }
      setTranslator((prevState) => ({ ...prevState, supportedLanguage: languages.data }))
    } catch (err: any) {
      // eslint-disable-next-line
      setError(err.message)
    }
    setLoading((prevState) => ({ ...prevState, loadingSupportedLanguage: false }))
  }

  const translate = async (
    value: string,
    fromLanguage: string,
    toLanguage: string,
  ): Promise<void> => {
    setLoading((prevState) => ({ ...prevState, loadingTranslate: true }))
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
    setLoading((prevState) => ({ ...prevState, loadingTranslate: false }))
  }

  const changeLanguageContext = (
    fromLanguage: string,
    toLanguage: string,
    valueText: string,
    translatedText: string,
  ): void => {
    setTranslator((prevState) => ({
      ...prevState,
      fromLanguage,
      toLanguage,
      valueText,
      translatedText,
    }))
  }

  const providerValue = {
    translator,
    translate,
    getSupportedLanguagesContext,
    changeLanguageContext,
    error,
    loading,
  }
  return <GlobalContext.Provider value={providerValue}> {children} </GlobalContext.Provider>
}
