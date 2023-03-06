import { render, screen } from '@testing-library/react'
import App from '../../App'

describe('SelectorField', () => {
  test('find SelectorField in DOM', () => {
    render(<App />)
    const SelectorField = screen.getByTestId('selectedToLanguage')
    expect(SelectorField).toBeInTheDocument()
  })
  test('find SelectorField in DOM', () => {
    render(<App />)
    const SelectorField = screen.getByTestId('selectedFromLanguage')
    expect(SelectorField).toBeInTheDocument()
  })
})
