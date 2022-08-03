import React, {useState} from 'react';
import {Link, Navigate, useSearchParams} from "react-router-dom";
import axios from "axios";
import Loader from "../../../components/Loader/Loader";
import {useDispatch, useSelector} from 'react-redux'
import {login} from '../../../store/auth/slice';
import {saveUserDataToLocalStore} from '../../../store/auth/hooks'

const Login = () => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)
  let [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || '/'


  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  

  const changeHandler = (event) => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const loginHandler = async () => {

    try {
      setIsLoading(true)
      await axios.post('https://todo-with-authorization.herokuapp.com/api/auth/login', {...form}, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        const {token, userId} = response.data
        saveUserDataToLocalStore({id: userId, token})
        dispatch(login({id: userId, token}))
      })

    } catch (e) {
      console.log(e)
    }
    finally {
      setIsLoading(false)
    }
  }

  if (token) {
    return <Navigate to={redirectTo} />
  }

  return (
    <div>
      {isLoading ? <Loader/>
        : <>
          <h3>Авторизация</h3>
          <form
            onSubmit={event=>event.preventDefault()}
            className='form form-login'>
            <div className="row">
              <div className="input-field col s12">
                <input
                  onChange={changeHandler}
                  type="email"
                  name='email'
                  className='validate'
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={changeHandler}
                  type="password"
                  name='password'
                  className='validate'
                />
                <label htmlFor="password">Пароль</label>
              </div>
            </div>
            <div className="row">
              <button
                type='button'
                onClick={loginHandler}
                className='wawes-effect wawes-light btn blue'
              >
                Войти
              </button>
              <Link
                to="/registration"
                className="btn-outline btn-reg"
              >Нет аккаунта ?
              </Link>
            </div>
          </form>
        </>}
    </div>
  );
};

export default Login;