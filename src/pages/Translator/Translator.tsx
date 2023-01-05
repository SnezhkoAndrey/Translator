import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../../context/GlobalContext'
import SubmitButton from '../../components/SubmitButton'
import { Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import SelectorField from '../../components/SelectorField'
import TextareaField from '../../components/TextareaField'
import { submitType } from '../../types/types'
import ChangeLanguageButton from '../../components/ChangeLanguageButton'
import toast from 'react-hot-toast'
import { styledError } from '../../style/StyledToaster'

const Translator: React.FC = () => {
  const {
    getSupportedLanguagesContext,
    translator,
    translate,
    changeLanguageContext,
    error,
    loading,
  } = useContext(GlobalContext)

  const { fromLanguage, translatedText, valueText, toLanguage } = translator
  const { loadingTranslate, loadingSupportedLanguage } = loading

  useEffect(() => {
    getSupportedLanguagesContext()
  }, [])

  const { control, handleSubmit, setValue, reset } = useForm<submitType>({
    defaultValues: {
      selectedFromLanguage: '',
      selectedToLanguage: '',
    },
  })

  const onSubmit = ({
    selectedFromLanguage,
    selectedToLanguage,
    fromLanguageTextarea,
    ToLanguageTextarea,
  }: submitType): void => {
    translate(fromLanguageTextarea, selectedFromLanguage, selectedToLanguage)
    changeLanguageContext(
      selectedFromLanguage,
      selectedToLanguage,
      fromLanguageTextarea,
      ToLanguageTextarea,
    )
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
      fromLanguageTextarea: translatedText,
      ToLanguageTextarea: valueText,
    }))
    changeLanguageContext(toLanguage, fromLanguage, translatedText, valueText)
  }

  useEffect(() => {
    if (error) {
      toast.error(error, styledError)
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
          <SubmitButton
            onSubmit={handleSubmit(onSubmit) as () => void}
            loading={loadingTranslate}
          />

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
            disabled={true}
          />
        </Stack>
      </Stack>
    </form>
  )
}

export default Translator
