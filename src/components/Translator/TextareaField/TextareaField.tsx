import React from 'react'
import TextField from '@mui/material/TextField'
import { Controller, Control } from 'react-hook-form'
import { nameType, submitType } from '../../../types/types'

interface PropsType {
  label: string
  name: nameType
  control: Control<submitType>
}

const TextareaField: React.FC<PropsType> = ({ control, label, name }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextField
          label={label}
          multiline
          rows={4}
          value={value}
          onChange={onChange}
          sx={{ width: '100%' }}
        />
      )}
    />
  )
}

export default TextareaField
