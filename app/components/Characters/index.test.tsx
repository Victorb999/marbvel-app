import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import Characters from './index'
import { getCharacters } from '../../services/api'

jest.mock('../../services/api', () => ({
  getCharacters: jest.fn((searchTerm) => {
    if (searchTerm === 'Spider') {
      return Promise.resolve({ total: 0, results: [] })
    } else {
      return Promise.resolve({
        total: 2,
        results: [
          {
            id: 1,
            name: 'Iron Man',
            thumbnail: { path: 'http://example.com', extension: 'jpg' },
          },
          {
            id: 2,
            name: 'Captain America',
            thumbnail: { path: 'http://example.com', extension: 'jpg' },
          },
        ],
      })
    }
  }),
}))

describe('Characters component', () => {
  test('renders input and character list', async () => {
    render(<Characters />)

    const inputElement = screen.getByPlaceholderText('Type a name caracter')
    fireEvent.change(inputElement, { target: { value: 'Iron' } })

    await waitFor(() => {
      // Check if getCharacters is called with the correct argument
      expect(getCharacters).toHaveBeenCalledWith('Iron')
    })

    // Check if character list is rendered
    const characterElements = screen.getAllByAltText(
      /Iron Man|Captain America/i,
    )
    expect(characterElements).toHaveLength(2)
  })
  test("renders input and shows 'No characters found' message", async () => {
    render(<Characters />)

    const inputElement = screen.getByPlaceholderText('Type a name caracter')
    fireEvent.change(inputElement, { target: { value: 'Spider' } })

    await waitFor(() => {
      // Check if getCharacters is called with the correct argument
      expect(getCharacters).toHaveBeenCalledWith('Spider')
    })

    await waitFor(() => {
      // Check if 'No characters found' message is displayed
      const noResultsMessage = screen.getAllByTestId('noFoudError')
      expect(noResultsMessage).toHaveLength(1)
    })

    // Check if character list is not rendered
    const characterElements = screen.queryAllByRole('img')
    expect(characterElements.length).toBe(0)
  })
  // This resets the mock implementation between tests, so they do not interfere with each other
  afterEach(() => jest.clearAllMocks())
})
