import { fireEvent, render, screen } from '@testing-library/react'
import SubmitButton from './SubmitButton'

describe('SubmitButton', () => {
  const clickEvent = jest.fn()

  test('find button in DOM', () => {
    render(<SubmitButton onSubmit={() => {}} loading={false} />)
    const submitButton = screen.getByTestId('submitButton')
    expect(submitButton).toBeInTheDocument()
  })
  test('Click event', () => {
    render(<SubmitButton onSubmit={clickEvent} loading={false} />)
    const submitButton = screen.getByTestId('submitButton')
    fireEvent.click(submitButton)
    expect(clickEvent).toBeCalled()
  })
})
