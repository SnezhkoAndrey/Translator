import React, { useContext, useEffect } from 'react'
import './App.css'
import Translator from './components/Translator'
import { GlobalContext, GlobalContextProvider } from './context/GlobalContext'
import Container from '@mui/material/Container'
import toast, { Toaster } from 'react-hot-toast'

const App: React.FC = () => {
  const { error } = useContext(GlobalContext)

  useEffect(() => {
    if (error) {
      toast.error(error, {
        style: {
          background: '#fff',
          color: '#333',
          boxShadow: '0.1px 0.1px 3px 1px red',
        },
      })
    }
  }, [error])

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
