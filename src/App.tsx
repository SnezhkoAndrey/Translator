import React from 'react'
import './App.css'
import Translator from './components/Translator'
import { GlobalContextProvider } from './context/GlobalContext'

const App: React.FC = () => {
  return (
    <GlobalContextProvider>
      <div className='App'>
        <Translator />
      </div>
    </GlobalContextProvider>
  )
}

export default App
