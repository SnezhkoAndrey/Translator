import React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import SupportedLanguage from '../SupportedLanguage'

interface PropsType {
  selectedLanguage: string
  changeLanguageFunction: (value: string) => void
}

const LanguageSelector: React.FC<PropsType> = ({ changeLanguageFunction, selectedLanguage }) => {
  const handleChangeLanguage = (event: SelectChangeEvent): void => {
    console.log(event.target.value)
    changeLanguageFunction(event.target.value)
  }
  console.log(selectedLanguage)
  return (
    <Box sx={{ width: 200, margin: '0 auto' }}>
      <FormControl fullWidth>
        <InputLabel>Language</InputLabel>
        <Select value={selectedLanguage} label='Language' onChange={handleChangeLanguage}>
          <SupportedLanguage />
        </Select>
      </FormControl>
    </Box>
  )
}

export default LanguageSelector
