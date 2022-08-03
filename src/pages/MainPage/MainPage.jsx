import React, {useCallback, useEffect, useState} from 'react';
import './MainPage.scss'
import axios from "axios";
import {useSelector} from 'react-redux';
import ActiveTodos from "../../components/ActiveTodos/ActiveTodos";
import CompletedTodos from "../../components/CompletedTodos/CompletedTodos";

const MainPage = () => {
  const {userId} = useSelector(state => state.auth.userId)
  const [text, setText] = useState('')
  const [todos, setTodos] = useState([])
  const createdAt  = new Date().toLocaleDateString()


  const getTodo = useCallback(async () => {
    try {
      await axios.get('https://todo-with-authorization.herokuapp.com/api/todo', {
        headers: {'Content-Type': 'application/json'},
        params: {userId}
      })
        .then(res => setTodos(res.data))
    } catch (e) {
      console.log(e)
    }
  }, [userId])
  useEffect(() => {
    getTodo()
  }, [getTodo])

  const createTodo = useCallback(async () => {
    if (!text) {
      return null
    }
    try {
      await axios.post('https://todo-with-authorization.herokuapp.com/api/todo/add', {
        text,
        userId,
        createdAt
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        setTodos([...todos], response.data)
        setText('')
        getTodo()
      })
    } catch (e) {
      console.log(e)
    }
  }, [text, userId, todos, getTodo, createdAt])



  const removeTodo = useCallback(async (id) => {
    try {
      axios.delete(`https://todo-with-authorization.herokuapp.com/api/todo/delete/${id}`, {id}, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(() => getTodo())
    } catch (e) {
      console.log(e)
    }
  }, [getTodo])


  const completeTodo = useCallback(async (id) => {
    try {
      await axios.put(`https://todo-with-authorization.herokuapp.com/api/todo/complete/${id}`, {id}, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          setTodos([...todos], response.data)
          getTodo()
        })

    } catch (e) {
      console.log(e)
    }
  }, [getTodo, todos])


  const importantTodo = useCallback(async (id) => {
    try {
      await axios.put(`https://todo-with-authorization.herokuapp.com/api/todo/important/${id}`, {id}, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          setTodos([...todos], response.data)
          getTodo()
        })
    } catch (e) {
      console.log(e)
    }
  }, [getTodo, todos])


  return (
    <div className='container'>
      <div className="main-page">
        <h4>Добавить задачу</h4>
        <form
          onSubmit={e=>e.preventDefault()}
          className="form form-login">
          <div className="row">
            <div className="input-field col s12">
              <input
                type="text"
                id='text'
                name='input'
                value={text}
                className='validate'
                onChange={e => setText(e.target.value)}
              />
              <label htmlFor="input">Задача:</label>
            </div>
          </div>
          <div className="row row-button">
            <button
              onClick={createTodo}
              className='waves-effect waves-light btn blue'
            >Добавить
            </button>
          </div>
        </form>
        <div className='container__list'>

          <div className='container__list-item'>
          <h3>Активные задачи:</h3>
            <ActiveTodos
                  completeTodo={completeTodo}
                  importantTodo={importantTodo}
                  todos={todos}
                  removeTodo={removeTodo}
                  createdAt={createdAt}
                />
          </div>

          <div className='container__list-item'>
          <h3>Выполненные задачи:</h3>
             <CompletedTodos
                  todos={todos}
                  removeTodo={removeTodo}
                />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;