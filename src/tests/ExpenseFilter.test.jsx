import { render, screen, fireEvent } from '@testing-library/react'
import ExpenseFilter from '../components/ExpenseFilter'

describe('ExpenseFilter', () => {
  test('renders filter dropdown', () => {
    render(<ExpenseFilter selectedCategory="All" onFilterChange={() => {}} />)
    expect(screen.getByLabelText('Filter by Category:')).toBeInTheDocument()
  })

  test('calls onFilterChange when category is selected', () => {
    const mockFilter = vi.fn()
    render(<ExpenseFilter selectedCategory="All" onFilterChange={mockFilter} />)
    fireEvent.change(screen.getByLabelText('Filter by Category:'), {
      target: { value: 'Food' },
    })
    expect(mockFilter).toHaveBeenCalledWith('Food')
  })
})