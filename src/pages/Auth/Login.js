import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

// Services
import request from '../../services/http'

// SCSS
import './Auth.scss'

const Login = () => {
  const emailInputRef = useRef(null)
  const passInputRef  = useRef(null)

  const [hasError, setHasError] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()

    request.post('/login', {
      email: emailInputRef.current.value,
      password: passInputRef.current.value,
    })
    .then(res => {
      alert('Success')
    })
    .catch(err => {
      setHasError(true)
    })
  }

  return (
    <div className="login-page">
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card mt-5">
              <div className="card-header">
                <h1>Login</h1>
              </div>
              <div className="card-body">
                {hasError &&
                  <div className="alert alert-danger" role="alert">
                    Email or password is invalid!
                  </div>
                }
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input ref={emailInputRef} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input ref={passInputRef} type="password" className="form-control" id="exampleInputPassword1" />
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
              </div>
              <div className="card-footer">
                <Link to="/register">Forgot password?</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
