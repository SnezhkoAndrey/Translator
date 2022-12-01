import React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

interface PropsType {
  value: string
  changeValue?: (value: string) => void
  label: string
}

const LanguageTextarea: React.FC<PropsType> = ({ value, changeValue, label }) => {
  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (changeValue) {
      changeValue(event.target.value)
    }
  }
  return (
    <Box sx={{ margin: '20px 0 0 0' }}>
      <TextField
        sx={{ width: { xs: 300, sm: 400, md: 400 } }}
        label={label}
        multiline
        rows={4}
        value={value}
        onChange={handleChangeText}
      />
    </Box>
  )
}

export default LanguageTextarea
