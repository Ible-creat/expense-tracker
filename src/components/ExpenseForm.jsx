import { useState } from 'react'

function ExpenseForm({ onAddExpense }) {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Food')
  const [date, setDate] = useState('')
  const [errors, setErrors] = useState({})

  function validate() {
    const newErrors = {}
    if (!name.trim()) newErrors.name = 'Expense name is required'
    if (!amount || amount <= 0) newErrors.amount = 'Enter a valid amount'
    if (!date) newErrors.date = 'Date is required'
    return newErrors
  }

  function handleSubmit(e) {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

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
    setErrors({})
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Expense</h2>
      <input placeholder="Expense name" value={name}
        onChange={(e) => setName(e.target.value)} />
      {errors.name && <span className="error">{errors.name}</span>}

      <input type="number" placeholder="Amount" value={amount}
        onChange={(e) => setAmount(e.target.value)} />
      {errors.amount && <span className="error">{errors.amount}</span>}

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option>Food</option>
        <option>Transport</option>
        <option>Shopping</option>
        <option>Bills</option>
        <option>Other</option>
      </select>

      <input type="date" value={date}
        onChange={(e) => setDate(e.target.value)} />
      {errors.date && <span className="error">{errors.date}</span>}

      <button type="submit">Add Expense</button>
    </form>
  )
}

export default ExpenseForm