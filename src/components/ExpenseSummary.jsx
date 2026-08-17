function ExpenseSummary({ expenses }) {
  const categories = ['Food', 'Transport', 'Shopping', 'Bills', 'Other']

  return (
    <div className="summary">
      <h2>Summary by Category</h2>
      <ul className="summary-list">
        {categories.map((cat) => {
          const total = expenses
            .filter((e) => e.category === cat)
            .reduce((sum, e) => sum + e.amount, 0)
          return (
            <li key={cat} className="summary-item">
              <span>{cat}</span>
              <span>${total.toFixed(2)}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default ExpenseSummary