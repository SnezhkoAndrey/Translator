import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../../context/GlobalContext'
import LanguageSelector from './LanguageSelector/LanguageSelector'
import LanguageTextarea from './LanguageTextArea/LanguageTextarea'
import ButtonBox from './Button'
import toast, { Toaster } from 'react-hot-toast'
import { Box, Stack } from '@mui/material'

const Translator: React.FC = () => {
  const {
    getSupportedLanguagesContext,
    error,
    fromLanguage,
    changeFromLanguage,
    changeValue,
    value,
    changeToLanguage,
    toLanguage,
    translatedText,
  } = useContext(GlobalContext)

  useEffect(() => {
    getSupportedLanguagesContext()
  }, [])

  useEffect(() => {
    if (error) {
      toast.error(error as string, {
        style: {
          background: '#fff',
          color: '#333',
          boxShadow: '0.1px 0.1px 3px 1px red',
        },
      })
    }
  }, [error])

  console.log('hey')

  return (
    <Stack
      direction={{ xs: 'column', sm: 'column', md: 'row' }}
      spacing={{ xs: 1, sm: 2, md: 4 }}
      justifyContent='center'
      alignItems={{ xs: 'center', sm: 'center', md: 'start' }}
      sx={{ mt: { xs: '20px', sm: '20px', md: '50px' } }}
    >
      <Toaster />
      <Box>
        <LanguageSelector
          selectedLanguage={fromLanguage}
          changeLanguageFunction={changeFromLanguage}
        />
        <LanguageTextarea value={value} changeValue={changeValue} label={'Your text'} />
      </Box>
      <ButtonBox />
      <Box>
        <LanguageSelector changeLanguageFunction={changeToLanguage} selectedLanguage={toLanguage} />
        <LanguageTextarea value={translatedText} label={translatedText ? '' : 'Translated text'} />
      </Box>
    </Stack>
  )
}

export default Translator
