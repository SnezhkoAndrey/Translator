import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import SyncAltIcon from '@mui/icons-material/SyncAlt'

interface PropsType {
  swapLanguages: () => void
  fromLanguage: string
  toLanguage: string
}

const ButtonChangeLanguage: React.FC<PropsType> = ({ swapLanguages, fromLanguage, toLanguage }) => {
  const handleChangeLanguage = (): void => {
    swapLanguages()
  }

  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    if (!!fromLanguage || !!toLanguage) {
      setDisabled(false)
    }
  }, [fromLanguage, toLanguage])

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

export default ButtonChangeLanguage
