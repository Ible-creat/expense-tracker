function ExpenseFilter({ selectedCategory, onFilterChange }) {
  return (
    <div>
      <label htmlFor="filter">Filter by Category:</label>
      <select
        id="filter"
        value={selectedCategory}
        onChange={(e) => onFilterChange(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Shopping">Shopping</option>
        <option value="Bills">Bills</option>
        <option value="Other">Other</option>
      </select>
    </div>
  )
}

export default ExpenseFilter