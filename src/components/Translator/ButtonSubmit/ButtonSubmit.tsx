import React from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

interface PropsType {
  onSubmit: () => void
}

const ButtonSubmit: React.FC<PropsType> = ({ onSubmit }) => {
  const handleKeyPress: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
    if (e.key === 'Enter') {
      console.log('here')

      onSubmit()
    }
  }
  return (
    <Box>
      <Button
        sx={{ margin: { xs: '10px 0', sm: 0, md: 0 } }}
        onClick={() => {
          onSubmit()
        }}
        onKeyDown={handleKeyPress}
        variant='contained'
      >
        Translate
      </Button>
    </Box>
  )
}

export default ButtonSubmit
