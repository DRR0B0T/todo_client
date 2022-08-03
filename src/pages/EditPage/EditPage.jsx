import React, {useCallback, useState, useEffect} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useNavigate, useParams} from "react-router-dom";
import './EditPage.scss'
import axios from "axios";
import {useSelector} from "react-redux";


const EditPage = () => {
  const [startDate, setStartDate] = useState(new Date());
  const createdAt = startDate.toLocaleDateString()
  const {userId} = useSelector(state => state.auth.userId)

  const [text, setText] = useState('')
  const [todos, setTodos] = useState([])
  const { id } = useParams();
  const navigate = useNavigate()

  const getTodo = useCallback(async () => {
    try {
      await axios.get('https://todo-with-authorization.herokuapp.com/api/todo', {
        headers: {'Content-Type': 'application/json'},
        params: {userId}
      })
        .then(res => {
            setTodos(res.data)
          }
        )
    } catch (e) {
      console.log(e)
    }
  }, [userId])

  useEffect(() => {
    getTodo()
  }, [getTodo])

  const saveTodo = useCallback(async () => {
    if (!text) {
      return null
    }
    try {
        await axios.post(`https://todo-with-authorization.herokuapp.com/api/todo/edit/${id}`,{text,
          createdAt},{id}, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => {
          setTodos([...todos], response.data)
          getTodo()
        })
    } catch (e) {
      console.log(e)
    }
  }, [id, text, todos,  getTodo ,createdAt])


  const handleSave = () => {

    if(saveTodo()) {
      navigate('/')
    }
  }

  return (
    <div className='container container__edit'>
      <form className='form form__edit'>
        <div className="row">
          <h3>Редактирование</h3>
          <div className="input-field col s12 form-input">
            <input
              type="text"
              id='title'
              name='title'
              className='validate'
              onChange={e => setText(e.target.value)}
            />
            <label htmlFor="title">Задача: {
              todos.map(item=> {
               return  item._id === id ? item.text : ''
              })
            }</label>
            <div
              className='date'
            >{todos.map(item => {
                return item._id === id ? item.createdAt : ''
            })}</div>
          </div>
        </div>

        <DatePicker
          className='form-date'
          selected={startDate}
          onChange={(date) =>
          setStartDate(date)}
        />
        <button
          type='button'
          onClick={handleSave}
          className='waves-effect waves-light btn blue form__edit-form-button'
        >
          Сохранить
        </button>
      </form>
    </div>
  );
};

export default EditPage;