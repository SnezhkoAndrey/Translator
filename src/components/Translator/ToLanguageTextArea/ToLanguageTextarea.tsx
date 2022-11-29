import React, { useContext } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { GlobalContext } from '../../../context/GlobalContext'

const ToLanguageTextarea: React.FC = () => {
  const { translatedText } = useContext(GlobalContext)

  return (
    <Box sx={{ mt: '20px' }}>
      <TextField
        sx={{ width: { xs: 300, sm: 400, md: 400 } }}
        label={translatedText ? '' : 'Translated text'}
        multiline
        rows={4}
        value={translatedText}
      />
    </Box>
  )
}

export default ToLanguageTextarea
