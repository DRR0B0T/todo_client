import React from 'react';

import './Navbar.scss'
import {Link} from "react-router-dom";
import {logOut} from '../../store/auth/slice'
import {useDispatch, useSelector} from 'react-redux'

const Navbar = () => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)

  function logoutHandler() {
    dispatch(logOut())
  }

  return (
    <nav>
      <div className="nav-wrapper navbar blue">
        <Link to="/" className="brand-logo">Список задач</Link>
        {
          token
              ? <button
              className='waves-effect waves-light btn blue navbar-button'
              onClick={logoutHandler}>
              Выйти</button>
            : ''
        }
      </div>
    </nav>
  );
};

export default Navbar;