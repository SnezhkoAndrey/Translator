import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../context/GlobalContext'
import ButtonSubmit from './ButtonSubmit'
import toast, { Toaster } from 'react-hot-toast'
import { Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import SelectorFild from './SelectorFild/SelectorFild'
import TextareaFild from './TextareaFild/TextareaFild'
import { submitType } from '../../types/types'
import ButtonChangeLanguage from './ButtonChangeLanguage'

const Translator: React.FC = () => {
  const {
    getSupportedLanguagesContext,
    error,
    fromLanguage,
    translatedText,
    translate,
    toLanguage,
    changeLanguageContext,
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

  const { control, handleSubmit, setValue } = useForm<submitType>({
    defaultValues: {
      selectedFromLanguage: fromLanguage,
      selectedToLanguage: toLanguage,
    },
  })

  const onSubmit = (data: submitType): void => {
    translate(data.fromLanguageTextarea, data.selectedFromLanguage, data.selectedToLanguage)
    changeLanguageContext(data.selectedFromLanguage, data.selectedToLanguage)
  }

  useEffect(() => {
    if (translatedText) setValue('ToLanguageTextarea', translatedText)
  }, [translatedText])

  useEffect(() => {
    if (fromLanguage) setValue('selectedFromLanguage', fromLanguage)
  }, [fromLanguage])

  const [changedLanguages, setChangedLanguages] = useState(false)

  const swapLanguages = (): void => {
    setChangedLanguages(!changedLanguages)
  }

  useEffect(() => {
    setValue('selectedFromLanguage', toLanguage)
    setValue('selectedToLanguage', fromLanguage)
    changeLanguageContext(toLanguage, fromLanguage)
  }, [changedLanguages])

  return (
    <form>
      <Stack
        direction={{ xs: 'column', sm: 'column', md: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 0 }}
        justifyContent='center'
        alignItems={{ xs: 'center', sm: 'center', md: 'start' }}
        sx={{ mt: { xs: '20px', sm: '20px', md: '50px' }, width: '100%' }}
      >
        <Toaster />

        <Stack spacing={2.5} sx={{ width: { xs: '80%', sm: '60%', md: '40%' } }}>
          <SelectorFild label={'Languages'} name={'selectedFromLanguage'} control={control} />

          <TextareaFild name={'fromLanguageTextarea'} label={'Your text'} control={control} />
        </Stack>
        <Stack spacing={0.5} direction={'column'} alignItems='center'>
          <ButtonSubmit onSubmit={handleSubmit(onSubmit) as () => void} />

          <ButtonChangeLanguage swapLanguages={swapLanguages} />
        </Stack>
        <Stack spacing={2.5} sx={{ width: { xs: '80%', sm: '60%', md: '40%' } }}>
          <SelectorFild label={'Languages'} name={'selectedToLanguage'} control={control} />

          <TextareaFild
            name={'ToLanguageTextarea'}
            label={translatedText ? '' : 'Translated text'}
            control={control}
          />
        </Stack>
      </Stack>
    </form>
  )
}

export default Translator
