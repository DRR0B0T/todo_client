import React from 'react';
import {Link} from "react-router-dom";
import '../../pages/MainPage/MainPage.scss'

const ActiveTodos = ({todos, completeTodo, importantTodo,removeTodo, createdAt}) => {

  return (

      <div className='todos'>
        {
          todos.map((todo, index) => {
            let cls = ['row flex todos-item ']
            if (todo.completed) {
              cls.push('completed')
            }
            if (todo.important) {
              cls.push('important')
            }

            const saveDate = todo.createdAt.substr(0,2)
            const currentDate = createdAt.substr(0,2)
            if ( saveDate - currentDate <= 2 && saveDate - currentDate > 0) {
              cls.push('red')
            }

            return (
              <div key={todo._id}>
                {
                  !todo.completed
                    ? (<div className={cls.join('')}>
                      <div className="col todos-num">Задача №{index + 1}</div>

                      <div className="col todos-text">{todo.text}</div>

                      <div className="col todos-buttons">
                      <span className='inline-date'>
                        {saveDate - currentDate > 0 ? 'Выполнить до:' : 'Cоздано:'} {todo.createdAt}
                      </span>
                        {!todo.completed ? <i
                          onClick={() => completeTodo(todo._id)}
                          className="material-icons  red-text">check</i> : ''}
                        {!todo.important ? <i
                          onClick={() => importantTodo(todo._id)}
                          className="material-icons  orange-text">warning</i> : ''
                        }
                        <i
                          onClick={() => removeTodo(todo._id)}
                          className="material-icons  blue-text">delete</i>
                        <Link to={`/edit/${todo._id}`}>
                          <i className="material-icons  blue-text">create</i>
                        </Link>
                      </div>
                  </div>)
                    : ''
                }
              </div>
            )
          })
        }
      </div>
  );
};

export default ActiveTodos;