import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

import './LoginWrapper.css';

const LoginWrapper = ({hideLogin, setUser}) => {

  const [type, setType] = useState('login');

  return(
    <div className='login-modal'>
      <div className='login-wrapper'>
        <div className='login-tabs'>
          <button onClick={() => setType('login')} className={type === 'login' ? 'active' : undefined}>Login</button>
          <button onClick={() => setType('signup')} className={type === 'signup' ? 'active' : undefined}>Sign up</button>
        </div>
        <div className='login-body'>
          {type === 'login' && <Login hideLogin={hideLogin} setUser={setUser} />} 
          {type === 'signup' && <Signup hideLogin={hideLogin} setUser={setUser}  />}
        </div>
      </div>
    </div>
  )
}

export default LoginWrapper;