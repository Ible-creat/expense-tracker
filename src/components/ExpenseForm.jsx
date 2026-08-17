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
    <form onSubmit={handleSubmit} aria-label="Add expense form">
      <h2>Add Expense</h2>

      <label htmlFor="name">Expense Name</label>
      <input
        id="name"
        placeholder="Expense name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        aria-describedby="name-error"
      />
      {errors.name && <span id="name-error" className="error" role="alert">{errors.name}</span>}

      <label htmlFor="amount">Amount</label>
      <input
        id="amount"
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        aria-describedby="amount-error"
      />
      {errors.amount && <span id="amount-error" className="error" role="alert">{errors.amount}</span>}

      <label htmlFor="category">Category</label>
      <select
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option>Food</option>
        <option>Transport</option>
        <option>Shopping</option>
        <option>Bills</option>
        <option>Other</option>
      </select>

      <label htmlFor="date">Date</label>
      <input
        id="date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        aria-describedby="date-error"
      />
      {errors.date && <span id="date-error" className="error" role="alert">{errors.date}</span>}

      <button type="submit">Add Expense</button>
    </form>
  )
}

export default ExpenseForm