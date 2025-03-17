import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { NavLink } from 'react-router-dom';
import { getImageUrl } from "../../utils";

import { login_confirm } from '../../components/modal_confirm/modal';

const Login = () => {
  const [cookies, setCookie] = useCookies('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    login_confirm(username, password,setCookie);
    setUsername("");
    setPassword("");
  }


  return (
     <div className="container h-100">
      <div className="row justify-content-sm-center h-100" >
        <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
          <div className="text-center" style={{marginTop:"10vh"}}>
            <img src={getImageUrl("bver.png")} alt="logo" width="100" />
          </div>
          <div className="card shadow-lg" style={{borderRadius:"16px",borderWidth:"2px",borderColor:"#5b58eb"}}>
            <div className="card-body p-5">
              <h1 className="fs-4 card-title fw-bold mb-4" style={{color:"#0A2353"}}>BVER APPLICATION</h1>
              <form className="needs-validation" onSubmit={handleSubmit} noValidate autoComplete="off">
                <div className="mb-3">
                  <label className="mb-2 text-muted" htmlFor="username" >Username</label>
                  <input
                    id="username"
                    type="text"
                    className="form-control"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoFocus
                  />
                  <div className="invalid-feedback">
                    Username is invalid
                  </div>
                </div>

                <div className="mb-3">
                  <div className="mb-2 w-100">
                    <label className="text-muted" htmlFor="password">Password</label>
                    
                  </div>
                  <input
                    id="password"
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div className="invalid-feedback">
                    Password is required
                  </div>
                </div>

                <div className="d-flex align-items-center">
                  <div className="form-check">
                    <input type="checkbox" name="remember" id="remember" className="form-check-input" />
                    <label htmlFor="remember" className="form-check-label">Remember Me</label>
                  </div>
                  <button type="submit" className="btn btn-primary ms-auto" style={{backgroundColor:"#112c70",borderColor:"#112c70"}}>
                    Login
                  </button>
                </div>
              </form>
            </div>
            <div className="card-footer py-3 border-0">
              <div className="text-center">
                Don't have an account? <NavLink to="/register" className="text-dark" >Create One</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Login