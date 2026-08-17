import { render, screen } from '@testing-library/react'
import ExpenseSummary from '../components/ExpenseSummary'

const mockExpenses = [
  { id: 1, name: 'Lunch', category: 'Food', date: '2026-08-17', amount: 20 },
  { id: 2, name: 'Bus fare', category: 'Transport', date: '2026-08-17', amount: 5 },
  { id: 3, name: 'Dinner', category: 'Food', date: '2026-08-17', amount: 15 },
]

describe('ExpenseSummary', () => {
  test('renders summary heading', () => {
    render(<ExpenseSummary expenses={mockExpenses} />)
    expect(screen.getByText('Summary by Category')).toBeInTheDocument()
  })

  test('shows correct total for Food category', () => {
    render(<ExpenseSummary expenses={mockExpenses} />)
    expect(screen.getByText('$35.00')).toBeInTheDocument()
  })

  test('shows correct total for Transport category', () => {
    render(<ExpenseSummary expenses={mockExpenses} />)
    expect(screen.getByText('$5.00')).toBeInTheDocument()
  })
})