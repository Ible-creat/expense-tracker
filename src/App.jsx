import { useState, useEffect } from 'react'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import ExpenseFilter from './components/ExpenseFilter'
import ExpenseSummary from './components/ExpenseSummary'
import './App.css'

function App() {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('expenses')
    return saved ? JSON.parse(saved) : []
  })
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  function handleAddExpense(expense) {
    setExpenses([...expenses, expense])
  }

  function handleDelete(id) {
    setExpenses(expenses.filter((e) => e.id !== id))
  }

  const filteredExpenses = selectedCategory === 'All'
    ? expenses
    : expenses.filter((e) => e.category === selectedCategory)

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
      </div>
      <p className="total">Total: ${total.toFixed(2)}</p>
      <ExpenseList
        expenses={filteredExpenses}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default App