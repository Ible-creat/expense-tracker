import { useState } from 'react'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import ExpenseFilter from './components/ExpenseFilter'
import './App.css'

function App() {
  const [expenses, setExpenses] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')

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
      <ExpenseFilter
        selectedCategory={selectedCategory}
        onFilterChange={setSelectedCategory}
      />
      <p>Total: ${total.toFixed(2)}</p>
      <ExpenseList
        expenses={filteredExpenses}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default App