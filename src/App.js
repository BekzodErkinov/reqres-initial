import { lazy, Suspense } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

// Pages
const UsersListPage = lazy(() => import('./pages/UsersList'))
const ErrorPage     = lazy(() => import('./pages/Error'))
const LoginPage     = lazy(() => import('./pages/Auth/Login'))
const RegisterPage  = lazy(() => import('./pages/Auth/Register'))

function App() {
  return (
    <div className="app">
      <Router>
        <Suspense fallback={ <h1>Loading...</h1> }>
          {false ? (
            <Switch>
              <Route exact path="/" component={UsersListPage} />
              <Route path="*" component={ErrorPage} />
            </Switch>
          ) : (
            <Switch>
              <Route exact path="/" component={LoginPage} />
              <Route path="/register" component={RegisterPage} />
              <Route path="*" component={ErrorPage} />
            </Switch>
          )}
        </Suspense>
      </Router>
    </div>
  )
}

export default App
