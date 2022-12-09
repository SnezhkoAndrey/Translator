import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../../context/GlobalContext'
import SubmitButton from './SubmitButton'
import { Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import SelectorField from './SelectorField/SelectorField'
import TextareaField from './TextareaField/TextareaField'
import { submitType } from '../../types/types'
import ChangeLanguageButton from './ChangeLanguageButton'
import toast from 'react-hot-toast'

const Translator: React.FC = () => {
  const {
    getSupportedLanguagesContext,
    fromLanguage,
    translatedText,
    translate,
    toLanguage,
    changeLanguageContext,
    error,
    loading,
    loadingSupportedLanguage,
  } = useContext(GlobalContext)

  useEffect(() => {
    getSupportedLanguagesContext()
  }, [])

  const { control, handleSubmit, setValue, reset } = useForm<submitType>({
    defaultValues: {
      selectedFromLanguage: '',
      selectedToLanguage: '',
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

  const swapLanguages = (): void => {
    reset((formValues) => ({
      ...formValues,
      selectedFromLanguage: toLanguage,
      selectedToLanguage: fromLanguage,
    }))
    changeLanguageContext(toLanguage, fromLanguage)
  }

  useEffect(() => {
    if (error) {
      toast.error(error, {
        style: {
          background: '#fff',
          color: '#333',
          boxShadow: '0.1px 0.1px 3px 1px red',
        },
      })
    }
  }, [error])

  return (
    <form>
      <Stack
        direction={{ xs: 'column', sm: 'column', md: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 0 }}
        justifyContent='center'
        alignItems={{ xs: 'center', sm: 'center', md: 'start' }}
        sx={{ mt: { xs: '20px', sm: '20px', md: '50px' }, width: '100%' }}
      >
        <Stack spacing={2.5} sx={{ width: { xs: '80%', sm: '60%', md: '40%' } }}>
          <SelectorField
            label={'Languages'}
            name={'selectedFromLanguage'}
            control={control}
            loading={loadingSupportedLanguage}
          />

          <TextareaField name={'fromLanguageTextarea'} label={'Your text'} control={control} />
        </Stack>
        <Stack spacing={0.7} direction={'column'} alignItems='center'>
          <SubmitButton onSubmit={handleSubmit(onSubmit) as () => void} loading={loading} />

          <ChangeLanguageButton
            swapLanguages={swapLanguages}
            disabled={!fromLanguage || !toLanguage}
          />
        </Stack>
        <Stack spacing={2.5} sx={{ width: { xs: '80%', sm: '60%', md: '40%' } }}>
          <SelectorField
            label={'Languages'}
            name={'selectedToLanguage'}
            control={control}
            loading={loadingSupportedLanguage}
          />

          <TextareaField
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
