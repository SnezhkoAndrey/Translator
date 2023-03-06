import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App component test', () => {
  test('renders textarea label link', () => {
    render(<App />)
    const input = screen.getByLabelText(/your text/i)
    expect(input).toBeInTheDocument()
  })
  test('renders textarea label link', () => {
    render(<App />)
    const input = screen.getByLabelText(/translated text/i)
    expect(input).toBeInTheDocument()
  })
})
