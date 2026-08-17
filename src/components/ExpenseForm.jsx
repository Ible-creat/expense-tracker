import { useState } from 'react'

function ExpenseForm({ onAddExpense }) {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Food')
  const [date, setDate] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!name || !amount || !date) return

    onAddExpense({
      id: Date.now(),
      name,
      amount: parseFloat(amount),
      category,
      date,
    })

    setName('')
    setAmount('')
    setCategory('Food')
    setDate('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Expense</h2>
      <input placeholder="Expense name" value={name}
        onChange={(e) => setName(e.target.value)} />
      <input type="number" placeholder="Amount" value={amount}
        onChange={(e) => setAmount(e.target.value)} />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option>Food</option>
        <option>Transport</option>
        <option>Shopping</option>
        <option>Bills</option>
        <option>Other</option>
      </select>
      <input type="date" value={date}
        onChange={(e) => setDate(e.target.value)} />
      <button type="submit">Add Expense</button>
    </form>
  )
}

export default ExpenseForm
