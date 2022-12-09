import React, { useContext } from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { MenuItem } from '@mui/material'
import { GlobalContext } from '../../../context/GlobalContext'
import { Controller, Control } from 'react-hook-form'
import { nameType, submitType } from '../../../types/types'

interface PropsType {
  label: string
  name: nameType
  control: Control<submitType>
  loading: boolean
}

const SelectorField: React.FC<PropsType> = ({ label, name, control, loading }) => {
  const { supportedLanguage } = useContext(GlobalContext)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {
        return (
          <Box sx={{ width: 200, margin: '0 auto' }}>
            <FormControl fullWidth>
              <InputLabel>{loading ? 'Loading...' : 'Languages'}</InputLabel>
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

export default SelectorField
