import React from 'react'
import Button from '@mui/material/Button'
import SyncAltIcon from '@mui/icons-material/SyncAlt'

interface PropsType {
  swapLanguages: () => void
}

const ButtonChangeLanguage: React.FC<PropsType> = ({ swapLanguages }) => {
  const handleChangeLanguage = (): void => {
    swapLanguages()
  }

  return (
    <Button
      onClick={handleChangeLanguage}
      title='Change languages'
      variant='outlined'
      sx={{ width: 12.5 }}
    >
      <SyncAltIcon />
    </Button>
  )
}

export default ButtonChangeLanguage
