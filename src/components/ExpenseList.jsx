function ExpenseList({ expenses, onDelete, onEdit }) {
  if (expenses.length === 0) {
    return <p>No expenses yet. Add one above.</p>
  }

  const maxAmount = Math.max(...expenses.map((e) => e.amount))

  return (
    <div>
      <p className="expense-count">{expenses.length} expense{expenses.length !== 1 ? 's' : ''} found</p>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id} className={expense.amount === maxAmount ? 'highlight' : ''}>
            <span>{expense.name}</span>
            <span>{expense.category}</span>
            <span>{expense.date}</span>
            <span>${expense.amount.toFixed(2)}</span>
            <div className="list-actions">
              <button onClick={() => onEdit(expense)}>Edit</button>
              <button className="delete-btn" onClick={() => onDelete(expense.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ExpenseList