import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

// Services
import request from '../../services/http'

const Register = ({ setToken }) => {
  const emailInputRef = useRef(null)
  const passInputRef  = useRef(null)
  const passCheckInputRef  = useRef(null)

  const [hasError, setHasError] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()

    if (passInputRef.current.value === passCheckInputRef.current.value) {
      request.post('/login', {
        email: emailInputRef.current.value,
        password: passInputRef.current.value,
      })
      .then(res => {
        window.localStorage.setItem('sessionToken', res.data.token)
        setToken(res.data.token)
      })
      .catch(err => {
        alert(err)
        console.error(err)
      })
    } else {
      setHasError(true)
    }
  }


  return (
    <div className="register-page">
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card mt-4">
              <div className="card-header d-flex align-items-baseline justify-content-between">
                <h1 className="d-inline">Register</h1>
                <a href="https://reqres.in" target="_blenk" rel="noopener noreferrer">ReqRes.in</a>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="card-body">
                  {hasError &&
                    <div className="alert alert-danger" role="alert">
                      Email or password is invalid !
                    </div>
                  }
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input ref={emailInputRef} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input ref={passInputRef} type="password" className="form-control" id="exampleInputPassword1" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                    <input ref={passCheckInputRef} type="password" className="form-control" id="exampleInputPassword1" />
                  </div>
                  <div className="buttons text-right">
                    <button type="submit" className="btn btn-primary">Send</button>
                  </div>
                </div>
                <div className="card-footer d-flex align-items-end justify-content-between">
                  {/* To Login page */}
                  <Link to="/">
                    <button type="submit" className="btn btn-primary">Sign in</button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
