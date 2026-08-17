function ExpenseList({ expenses, onDelete }) {
  if (expenses.length === 0) {
    return <p>No expenses yet. Add one above.</p>
  }

  return (
    <ul>
      {expenses.map((expense) => (
        <li key={expense.id}>
          <span>{expense.name}</span>
          <span>{expense.category}</span>
          <span>{expense.date}</span>
          <span>${expense.amount.toFixed(2)}</span>
          <button onClick={() => onDelete(expense.id)}>Delete</button>
        </li>
      ))}
    </ul>
  )
}

export default ExpenseList