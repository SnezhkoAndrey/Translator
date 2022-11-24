import React, { useContext } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { GlobalContext } from '../../../context/GlobalContext'

const ToLanguageTextarea: React.FC = () => {
  const { translatedText } = useContext(GlobalContext)

  return (
    <>
      <Box sx={{ margin: '20px 0 0 0' }}>
        <TextField
          sx={{ width: { xs: '300px', sm: '400px', md: '400px' } }}
          id='outlined-multiline-static'
          label={translatedText ? '' : 'Translated text'}
          multiline
          rows={4}
          value={translatedText}
        />
      </Box>
    </>
  )
}

export default ToLanguageTextarea
