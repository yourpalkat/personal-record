import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

const LoginWrapper = ({hideLogin, setUser}) => {

  const [type, setType] = useState('login');

  return(
    <div className="login-wrapper">
      <div className="tabs">
        <button onClick={() => setType('login')}>Login</button>
        <button onClick={() => setType('signup')}>Sign up</button>
      </div>
    {type === 'login' && <Login hideLogin={hideLogin} setUser={setUser} />} 
    {type === 'signup' && <Signup hideLogin={hideLogin} setUser={setUser}  />}
    </div>
  )
}

export default LoginWrapper;