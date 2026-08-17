import { render, screen, fireEvent } from '@testing-library/react'
import ExpenseList from '../components/ExpenseList'

const mockExpenses = [
  { id: 1, name: 'Lunch', category: 'Food', date: '2026-08-17', amount: 20 },
  { id: 2, name: 'Bus fare', category: 'Transport', date: '2026-08-17', amount: 5 },
]

describe('ExpenseList', () => {
  test('renders empty message when no expenses', () => {
    render(<ExpenseList expenses={[]} onDelete={() => {}} />)
    expect(screen.getByText('No expenses yet. Add one above.')).toBeInTheDocument()
  })

  test('renders list of expenses', () => {
    render(<ExpenseList expenses={mockExpenses} onDelete={() => {}} />)
    expect(screen.getByText('Lunch')).toBeInTheDocument()
    expect(screen.getByText('Bus fare')).toBeInTheDocument()
  })

  test('calls onDelete when delete button is clicked', () => {
    const mockDelete = vi.fn()
    render(<ExpenseList expenses={mockExpenses} onDelete={mockDelete} />)
    const deleteButtons = screen.getAllByText('Delete')
    fireEvent.click(deleteButtons[0])
    expect(mockDelete).toHaveBeenCalledWith(1)
  })
})