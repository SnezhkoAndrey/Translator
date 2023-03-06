import { fireEvent, render, screen } from '@testing-library/react'
import App from '../../App'

describe('TextareaField', () => {
  test('find TextareaField in DOM', () => {
    render(<App />)
    const TextareaField = screen.getAllByTestId('textareaField')
    expect(TextareaField.length).toBe(2)
  })
  test('onChange event', () => {
    render(<App />)
    fireEvent.input(screen.getByLabelText(/your text/i), {
      target: { value: 'hello' },
    })
    expect(screen.getByLabelText(/your text/i)).toContainHTML('hello')
  })
  test('onChange event', () => {
    render(<App />)
    fireEvent.input(screen.getByLabelText(/translated text/i), {
      target: { value: 'hello' },
    })
    expect(screen.getByLabelText(/translated text/i)).toContainHTML('hello')
  })
})
