import { useState, lazy, Suspense } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
// Containers
import Navbar from './containers/Navbar'
// Components
import Loader from './components/Animation'

// Lazy load Pages
const UsersListPage = lazy(() => import('./pages/UsersList'))
const ErrorPage     = lazy(() => import('./pages/Error'))
const LoginPage     = lazy(() => import('./pages/Auth/Login'))
const RegisterPage  = lazy(() => import('./pages/Auth/Register'))

function App() {
  const [token, setToken] = useState(window.localStorage.getItem('sessionToken'))

  return (
    <div className="app">
      <Router>
        <Suspense fallback={ <div className="text-center mt-5">{<Loader />}</div> }>
          {token ? (
            <>
              <Navbar setToken={setToken} />

              <Switch>
                <Redirect from="/register/" to="/" />
                <Route exact path="/" component={UsersListPage} />
                <Route path="*" component={ErrorPage} />
              </Switch>
            </>
          ) : (
            <Switch>
              <Route exact path="/" render={() => <LoginPage setToken={setToken} />} />
              <Route path="/register" render={() => <RegisterPage setToken={setToken} />} />
              <Route path="*" component={ErrorPage} />
            </Switch>
          )}
        </Suspense>
      </Router>
    </div>
  )
}

export default App
