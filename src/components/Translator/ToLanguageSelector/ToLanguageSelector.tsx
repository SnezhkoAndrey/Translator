import React, { useContext } from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { GlobalContext } from '../../../context/GlobalContext'
import SupportedLanguage from '../SupportedLanguage'

const ToLanguageSelector: React.FC = () => {
  const { changeToLanguage, toLanguage } = useContext(GlobalContext)

  const handleChangeToLanguage = (event: SelectChangeEvent): void => {
    changeToLanguage(event.target.value)
  }
  return (
    <>
      <Box sx={{ width: 200, margin: '0 auto' }}>
        <FormControl fullWidth>
          <InputLabel>Language</InputLabel>
          <Select value={toLanguage} label='Language' onChange={handleChangeToLanguage}>
            <SupportedLanguage />
          </Select>
        </FormControl>
      </Box>
    </>
  )
}

export default ToLanguageSelector
