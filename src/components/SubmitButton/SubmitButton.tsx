import React from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'

interface PropsType {
  onSubmit: () => void
  loading: boolean
}

const SubmitButton: React.FC<PropsType> = ({ onSubmit, loading }) => {
  const handleKeyPress: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
    if (e.key === 'Enter') {
      onSubmit()
    }
  }
  return (
    <Box>
      <LoadingButton
        onClick={onSubmit}
        onKeyDown={handleKeyPress}
        variant='contained'
        loading={loading}
        data-testid='submitButton'
      >
        Translate
      </LoadingButton>
    </Box>
  )
}

export default SubmitButton
