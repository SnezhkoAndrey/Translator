import { render, screen } from '@testing-library/react'
import { GlobalContextProvider } from './GlobalContext'
import App from '../App'

describe('Global Context test', () => {
  test('should find the selected item', () => {
    render(
      <GlobalContextProvider>
        <App />
      </GlobalContextProvider>,
    )
    const linkElem = screen.getByLabelText(/your text/i)
    expect(linkElem).toBeInTheDocument()
  })

  test('should not find the selected item', () => {
    render(<GlobalContextProvider>{null}</GlobalContextProvider>)
    const linkElem = screen.queryByLabelText(/your text/i)
    expect(linkElem).not.toBeInTheDocument()
  })
})
