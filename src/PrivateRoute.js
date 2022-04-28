import { Navigate } from 'react-router-dom';
import { React, useState, useEffect} from 'react';
import {auth} from './util/firebase';
import 'PrivateRoute.css';

const PrivateRoute = ({children}) => {
  const [user, setUser] = useState(null);
  const [pending, setPending] = useState(true);

  // // login
  useEffect(() => {
    auth.onAuthStateChanged(_user => {
        setUser(_user);
        setPending(false);
    });
  }, []);

  if(pending) {
    return <div className='loading-title'><p>Loading...</p></div>
  }
  if(!user){
      return <Navigate to="/authentication/sign-in"/>
  }
  return children;
}

export default PrivateRoute;