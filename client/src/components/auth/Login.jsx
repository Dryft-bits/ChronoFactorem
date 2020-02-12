import React, { Fragment, useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    // default values
    username: "",
    password: ""
  });

  const { username, password } = formData;

  const onChange = e =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  return (
    <Fragment>
      <h1>Login</h1>
      <p>Log Into Your Account</p>
      <form className='form'>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Username'
            name='username'
            value={username}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-dark' value='Login' />
      </form>
    </Fragment>
  );
};

export default Login;
