import React, { useContext } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { GlobalContext } from '../../../context/GlobalContext'

const FromLanguageTextarea: React.FC = () => {
  const { changeValue, value } = useContext(GlobalContext)

  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>): void => {
    changeValue(event.target.value)
  }
  return (
    <Box sx={{ margin: '20px 0 0 0' }}>
      <TextField
        sx={{ width: { xs: 300, sm: 400, md: 400 } }}
        label='Your text'
        multiline
        rows={4}
        value={value}
        onChange={handleChangeText}
      />
    </Box>
  )
}

export default FromLanguageTextarea
