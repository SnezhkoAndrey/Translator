import React, { useContext } from 'react'
import Button from '@mui/material/Button'
import { GlobalContext } from '../../../context/GlobalContext'

const ButtonBox: React.FC = () => {
  const { translate } = useContext(GlobalContext)

  const handleClickTranslate = (e: React.SyntheticEvent): void => {
    e.preventDefault()
    translate()
  }

  const handleKeyPress: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
    if (e.key === 'Enter') {
      handleClickTranslate(e)
    }
  }
  return (
    <>
      <Button
        sx={{ margin: { xs: '10px 0', sm: 0, md: 0 } }}
        onClick={handleClickTranslate}
        onKeyDown={handleKeyPress}
        variant='contained'
      >
        Translate
      </Button>
    </>
  )
}

export default ButtonBox