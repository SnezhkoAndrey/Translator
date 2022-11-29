import React, { useContext } from 'react'
import MenuItem from '@mui/material/MenuItem'
import { GlobalContext } from '../../context/GlobalContext'

const SupportedLanguage: React.FC = () => {
  const { supportedLanguage } = useContext(GlobalContext)

  return (
    <>
      {supportedLanguage.map((sl) => (
        <MenuItem key={sl.code} value={sl.language}>
          {sl.language}
        </MenuItem>
      ))}
    </>
  )
}

export default SupportedLanguage
