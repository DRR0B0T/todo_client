import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {saveUserDataToLocalStore} from "../../../store/auth/hooks";
import {login} from "../../../store/auth/slice";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../../../components/Loader/Loader";

const Registration = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)
  const [isLoading, setIsLoading] = useState(false)


  const changeHandler = (event) => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const registerHandler = async () => {
    try {
      setIsLoading(true)
      await axios.post('https://todo-with-authorization.herokuapp.com/api/auth/registration', {...form}, {
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
    } finally {
      setIsLoading(false)
    }
  }

  if (token) {
    navigate('/')
  }

  return (
    <div >
      {isLoading ? <Loader/> : <>  <h3>Регистрация</h3>
          <form
            onSubmit={event => event.preventDefault()}
            className='form form-login' >
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
                type='submit'
                onClick={registerHandler}
                className='wawes-effect wawes-light btn blue'
              >
                Регистрация
              </button>
              <Link
                to="/login" className="btn-outline btn-reg">Уже есть аккаунт ?</Link>
            </div>
          </form>
      </>}
    </div>
  );
};

export default Registration;