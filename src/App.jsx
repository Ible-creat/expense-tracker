import { useState, useEffect } from 'react'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import ExpenseFilter from './components/ExpenseFilter'
import ExpenseSummary from './components/ExpenseSummary'
import EditExpenseModal from './components/EditExpenseModal'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('expenses')
    return saved ? JSON.parse(saved) : []
  })
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('date')
  const [editingExpense, setEditingExpense] = useState(null)
  const [search, setSearch] = useState('')

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

  function handleClearAll() {
    if (window.confirm('Are you sure you want to clear all expenses?')) {
      setExpenses([])
    }
  }

  const filteredExpenses = expenses
    .filter((e) => selectedCategory === 'All' || e.category === selectedCategory)
    .filter((e) => e.name.toLowerCase().includes(search.toLowerCase()))

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
      <div className="search">
        <label htmlFor="search">Search:</label>
        <input
          id="search"
          placeholder="Search expenses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
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
      <div className="list-header">
        <p className="total">Total: ${total.toFixed(2)}</p>
        {expenses.length > 0 && (
          <button className="clear-btn" onClick={handleClearAll}>
            Clear All
          </button>
        )}
      </div>
      <ExpenseList
        expenses={sortedExpenses}
        onDelete={handleDelete}
        onEdit={handleEdit}
        isFiltered={search !== '' || selectedCategory !== 'All'}
      />
      {editingExpense && (
        <EditExpenseModal
          expense={editingExpense}
          onSave={handleSaveEdit}
          onClose={() => setEditingExpense(null)}
        />
      )}
      <Footer />
    </div>
  )
}

export default App