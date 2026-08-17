# Expense Tracker

A React application for tracking personal expenses with filtering, sorting, and category summaries.

## Features

- Add expenses with name, amount, category, and date
- Filter expenses by category
- Sort expenses by date, amount, or name
- View total expenses dynamically
- Summary breakdown by category
- Edit existing expenses
- Delete individual expenses
- Clear all expenses at once
- Data persists on page refresh via local storage
- Form validation with error messages
- Fully accessible with labels and aria attributes
- Responsive on mobile devices

## Tech Stack

- React 19
- Vite 8
- Vitest
- Testing Library

## Getting Started

Install dependencies:
```bash
npm install
```

Run the app:
```bash
npm run dev
```

Run tests:
```bash
npm test
```

## Project Structure

```
src/
  components/
    ExpenseForm.jsx
    ExpenseList.jsx
    ExpenseFilter.jsx
    ExpenseSummary.jsx
    EditExpenseModal.jsx
  tests/
    ExpenseForm.test.jsx
    ExpenseList.test.jsx
    ExpenseFilter.test.jsx
    ExpenseSummary.test.jsx
    EditExpenseModal.test.jsx
  App.jsx
  App.css
  main.jsx
```