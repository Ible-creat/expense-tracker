import { render, screen, fireEvent } from '@testing-library/react'
import ExpenseForm from '../components/ExpenseForm'

describe('ExpenseForm', () => {
  test('renders all form fields', () => {
    render(<ExpenseForm onAddExpense={() => {}} />)
    expect(screen.getByPlaceholderText('Expense name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Amount')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Add Expense' })).toBeInTheDocument()
  })

  test('calls onAddExpense when form is submitted', () => {
    const mockAdd = vi.fn()
    render(<ExpenseForm onAddExpense={mockAdd} />)

    fireEvent.change(screen.getByPlaceholderText('Expense name'), {
      target: { value: 'Lunch' },
    })
    fireEvent.change(screen.getByPlaceholderText('Amount'), {
      target: { value: '20' },
    })
    fireEvent.change(document.querySelector('input[type="date"]'), {
      target: { value: '2026-08-17' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Add Expense' }))
    expect(mockAdd).toHaveBeenCalled()
  })
})