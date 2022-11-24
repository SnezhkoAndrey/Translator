import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../../context/GlobalContext'
import FromLanguageSelector from './FromLanguageSelector/FromLanguageSelector'
import FromLanguageTextarea from './FromLanguageTextArea/FromLanguageTextarea'
import ToLanguageSelector from './ToLanguageSelector/ToLanguageSelector'
import ToLanguageTextarea from './ToLanguageTextArea/ToLanguageTextarea'
import ButtonBox from './Button'
import toast, { Toaster } from 'react-hot-toast'
import { Box, Stack } from '@mui/material'

const Translator: React.FC = () => {
  const { getSupportedLanguagesContext, error } = useContext(GlobalContext)

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
      margin={{ xs: '20px 0 0 0', sm: '20px 0 0 0', md: '50px 0 0 0' }}
    >
      <Toaster />
      <Box>
        <FromLanguageSelector />
        <FromLanguageTextarea />
      </Box>
      <Box>
        <ButtonBox />
      </Box>
      <Box>
        <ToLanguageSelector />
        <ToLanguageTextarea />
      </Box>
    </Stack>
  )
}

export default Translator
