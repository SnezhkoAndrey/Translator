import React, { useContext } from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { MenuItem } from '@mui/material'
import { GlobalContext } from '../../../context/GlobalContext'
import { Controller, Control } from 'react-hook-form'
import { submitType } from '../../../types/types'

interface PropsType {
  label: string
  name:
    | 'selectedFromLanguage'
    | 'fromLanguageTextarea'
    | 'selectedToLanguage'
    | 'ToLanguageTextarea'
  control: Control<submitType>
}

const SelectorFild: React.FC<PropsType> = ({ label, name, control }) => {
  const { supportedLanguage } = useContext(GlobalContext)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {
        return (
          <Box sx={{ width: 200, margin: '0 auto' }}>
            <FormControl fullWidth>
              <InputLabel>Languages</InputLabel>
              <Select value={value} label={label} onChange={onChange}>
                {supportedLanguage.map((language) => (
                  <MenuItem key={language.code} value={language.language}>
                    {language.language}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )
      }}
    />
  )
}

export default SelectorFild
