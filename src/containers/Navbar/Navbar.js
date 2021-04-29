const Navbar = ({ setToken }) => {
  function handleExitApp() {
    window.localStorage.removeItem('sessionToken')
    setToken(false)
  }

  return (
    <nav className="navbar navbar-dark bg-dark text-white mb-4">
      <div className="container">
        <div className="w-100 d-flex justify-content-between align-items-center">
          <h2 className="navbar-brand mb-0 h1">Users List</h2>
          <button
            className="btn btn-secondary"
            onClick={handleExitApp}
          >Exit</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
