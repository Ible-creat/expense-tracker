function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <p>Expense Tracker &copy; {year}. Built with React.</p>
    </footer>
  )
}

export default Footer