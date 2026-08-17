import { useState, useEffect } from 'react'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import ExpenseFilter from './components/ExpenseFilter'
import ExpenseSummary from './components/ExpenseSummary'
import EditExpenseModal from './components/EditExpenseModal'
import './App.css'

function App() {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('expenses')
    return saved ? JSON.parse(saved) : []
  })
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('date')
  const [editingExpense, setEditingExpense] = useState(null)

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  function handleAddExpense(expense) {
    setExpenses([...expenses, expense])
  }

  function handleDelete(id) {
    setExpenses(expenses.filter((e) => e.id !== id))
  }

  function handleEdit(expense) {
    setEditingExpense(expense)
  }

  function handleSaveEdit(updated) {
    setExpenses(expenses.map((e) => e.id === updated.id ? updated : e))
    setEditingExpense(null)
  }

  const filteredExpenses = selectedCategory === 'All'
    ? expenses
    : expenses.filter((e) => e.category === selectedCategory)

  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    if (sortBy === 'date') return new Date(b.date) - new Date(a.date)
    if (sortBy === 'amount') return b.amount - a.amount
    return a.name.localeCompare(b.name)
  })

  const total = filteredExpenses.reduce((sum, e) => sum + e.amount, 0)

  return (
    <div className="app">
      <h1>Expense Tracker</h1>
      <ExpenseForm onAddExpense={handleAddExpense} />
      <ExpenseSummary expenses={expenses} />
      <div className="filter">
        <ExpenseFilter
          selectedCategory={selectedCategory}
          onFilterChange={setSelectedCategory}
        />
        <div className="sort">
          <label htmlFor="sort">Sort by:</label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>
      <p className="total">Total: ${total.toFixed(2)}</p>
      <ExpenseList
        expenses={sortedExpenses}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      {editingExpense && (
        <EditExpenseModal
          expense={editingExpense}
          onSave={handleSaveEdit}
          onClose={() => setEditingExpense(null)}
        />
      )}
    </div>
  )
}

export default App