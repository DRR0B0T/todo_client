import React from 'react';
import './Error.scss'
import {Link} from "react-router-dom";

const Error = () => {
  return (
    <div className='container error-page'>
      <h1 className='red-text  text-accent-4'>Вы перешли на несуществующую страницу 404</h1>
      <Link to='/'>
        <button
          className='waves-effect waves-light btn blue '
        >
          Вернуться назад
        </button>
      </Link>
    </div>
  );
};

export default Error;