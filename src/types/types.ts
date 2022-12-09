export interface TranslateText {
  data: {
    from_language: string
    text: string
    to_language: string
  }
  message: string
  status: boolean
  totalResultCount: number
}

export interface DetectedText {
  data: {
    code: string
    language: string
  }
  message: string
  status: boolean
  totalResultCount: number
}

export interface LanguageCode {
  code: string
  language: string
}

export interface SupportedLanguage {
  data: LanguageCode[]
  message: string
  status: boolean
  totalResultCount: number
}

export interface submitType {
  selectedFromLanguage: string
  fromLanguageTextarea: string
  selectedToLanguage: string
  ToLanguageTextarea: string
}

export type nameType =
  | 'selectedFromLanguage'
  | 'fromLanguageTextarea'
  | 'selectedToLanguage'
  | 'ToLanguageTextarea'
