import React, { useContext } from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { GlobalContext } from '../../../context/GlobalContext'

const ToLanguageSelector: React.FC = () => {
  const { changeToLanguage, toLanguage, supportedLanguage } = useContext(GlobalContext)

  const handleChangeToLanguage = (event: SelectChangeEvent): void => {
    changeToLanguage(event.target.value)
  }
  return (
    <>
      <Box sx={{ width: 200, margin: '0 auto' }}>
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>Language</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={toLanguage}
            label='Language'
            onChange={handleChangeToLanguage}
          >
            {supportedLanguage.map((sl) => (
              <MenuItem key={sl.code} value={sl.language}>
                {sl.language}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </>
  )
}

export default ToLanguageSelector
