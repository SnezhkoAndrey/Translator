import React from 'react'
import './App.css'
import Translator from './components/Translator'
import { GlobalContextProvider } from './context/GlobalContext'
import Container from '@mui/material/Container'

const App: React.FC = () => {
  return (
    <GlobalContextProvider>
      <Container maxWidth='lg'>
        <Translator />
      </Container>
    </GlobalContextProvider>
  )
}

export default App
