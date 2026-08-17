import { useState } from 'react'

function EditExpenseModal({ expense, onSave, onClose }) {
  const [name, setName] = useState(expense.name)
  const [amount, setAmount] = useState(expense.amount)
  const [category, setCategory] = useState(expense.category)
  const [date, setDate] = useState(expense.date)

  function handleSubmit(e) {
    e.preventDefault()
    if (!name || !amount || !date) return
    onSave({ ...expense, name, amount: parseFloat(amount), category, date })
  }

  return (
    <div className="modal-overlay" role="dialog" aria-label="Edit expense">
      <div className="modal">
        <h2>Edit Expense</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="edit-name">Expense Name</label>
          <input id="edit-name" value={name}
            onChange={(e) => setName(e.target.value)} />

          <label htmlFor="edit-amount">Amount</label>
          <input id="edit-amount" type="number" value={amount}
            onChange={(e) => setAmount(e.target.value)} />

          <label htmlFor="edit-category">Category</label>
          <select id="edit-category" value={category}
            onChange={(e) => setCategory(e.target.value)}>
            <option>Food</option>
            <option>Transport</option>
            <option>Shopping</option>
            <option>Bills</option>
            <option>Other</option>
          </select>

          <label htmlFor="edit-date">Date</label>
          <input id="edit-date" type="date" value={date}
            onChange={(e) => setDate(e.target.value)} />

          <div className="modal-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditExpenseModal