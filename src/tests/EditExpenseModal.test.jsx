import { render, screen, fireEvent } from '@testing-library/react'
import EditExpenseModal from '../components/EditExpenseModal'

const mockExpense = {
  id: 1,
  name: 'Lunch',
  category: 'Food',
  date: '2026-08-17',
  amount: 20,
}

describe('EditExpenseModal', () => {
  test('renders with existing expense values', () => {
    render(<EditExpenseModal expense={mockExpense} onSave={() => {}} onClose={() => {}} />)
    expect(screen.getByDisplayValue('Lunch')).toBeInTheDocument()
    expect(screen.getByDisplayValue('20')).toBeInTheDocument()
  })

  test('calls onClose when cancel is clicked', () => {
    const mockClose = vi.fn()
    render(<EditExpenseModal expense={mockExpense} onSave={() => {}} onClose={mockClose} />)
    fireEvent.click(screen.getByText('Cancel'))
    expect(mockClose).toHaveBeenCalled()
  })

  test('calls onSave with updated values when saved', () => {
    const mockSave = vi.fn()
    render(<EditExpenseModal expense={mockExpense} onSave={mockSave} onClose={() => {}} />)
    fireEvent.change(screen.getByDisplayValue('Lunch'), {
      target: { value: 'Dinner' },
    })
    fireEvent.click(screen.getByText('Save'))
    expect(mockSave).toHaveBeenCalledWith(expect.objectContaining({ name: 'Dinner' }))
  })
})