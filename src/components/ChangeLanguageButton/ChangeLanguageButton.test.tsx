import { fireEvent, render, screen } from '@testing-library/react'
import ChangeLanguageButton from './ChangeLanguageButton'

describe('ChangeLanguageButton', () => {
  const clickEvent = jest.fn()

  test('find button in DOM', () => {
    render(<ChangeLanguageButton swapLanguages={() => {}} disabled={false} />)
    const changeLanguageButton = screen.getByTestId('changeLanguageButton')
    expect(changeLanguageButton).toBeInTheDocument()
  })
  test('Click event', () => {
    render(<ChangeLanguageButton swapLanguages={clickEvent} disabled={false} />)
    const changeLanguageButton = screen.getByTestId('changeLanguageButton')
    fireEvent.click(changeLanguageButton)
    expect(clickEvent).toBeCalled()
  })
})
