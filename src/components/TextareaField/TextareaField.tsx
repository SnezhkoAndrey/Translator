import React from 'react'
import TextField from '@mui/material/TextField'
import { Controller, Control } from 'react-hook-form'
import { nameType, submitType } from '../../types/types'

interface PropsType {
  label: string
  name: nameType
  control: Control<submitType>
  disabled?: boolean
}

const TextareaField: React.FC<PropsType> = ({ control, label, name, disabled }) => {
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
          data-testid={'textareaField'}
          onChange={onChange}
          inputProps={{ readOnly: disabled }}
          sx={{ width: '100%' }}
        />
      )}
    />
  )
}

export default TextareaField
