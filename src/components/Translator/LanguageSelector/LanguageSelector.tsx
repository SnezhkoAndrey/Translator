import React, { useContext } from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { MenuItem } from '@mui/material'
import { GlobalContext } from '../../../context/GlobalContext'

interface PropsType {
  selectedLanguage: string
  changeLanguageFunction: (value: string) => void
}

const LanguageSelector: React.FC<PropsType> = ({ changeLanguageFunction, selectedLanguage }) => {
  const { supportedLanguage } = useContext(GlobalContext)

  const handleChangeLanguage = (event: SelectChangeEvent): void => {
    changeLanguageFunction(event.target.value)
  }
  return (
    <Box sx={{ width: 200, margin: '0 auto' }}>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>Age</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={selectedLanguage}
          label='Age'
          onChange={handleChangeLanguage}
        >
          {supportedLanguage.map((language) => (
            <MenuItem key={language.code} value={language.language}>
              {language.language}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default LanguageSelector
