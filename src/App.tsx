import React from 'react'
import './App.css'
import Translator from './pages/Translator'
import { GlobalContextProvider } from './context/GlobalContext'
import Container from '@mui/material/Container'
import { Toaster } from 'react-hot-toast'

const App: React.FC = () => {
  return (
    <GlobalContextProvider>
      <Container maxWidth='lg'>
        <Toaster />
        <Translator />
      </Container>
    </GlobalContextProvider>
  )
}

export default App
