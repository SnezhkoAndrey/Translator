import React from 'react'
import Button from '@mui/material/Button'
import SyncAltIcon from '@mui/icons-material/SyncAlt'

interface PropsType {
  swapLanguages: () => void
  disabled: boolean
}

const ChangeLanguageButton: React.FC<PropsType> = ({ swapLanguages, disabled }) => {
  const handleChangeLanguage = (): void => {
    swapLanguages()
  }

  return (
    <Button
      onClick={handleChangeLanguage}
      title='Change languages'
      variant='outlined'
      sx={{ width: 12.5 }}
      disabled={disabled}
    >
      <SyncAltIcon />
    </Button>
  )
}

export default ChangeLanguageButton
