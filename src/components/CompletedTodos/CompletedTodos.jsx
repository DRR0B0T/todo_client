import React from 'react';
import {Link} from "react-router-dom";
import '../../pages/MainPage/MainPage.scss'

const CompletedTodos = ({todos,removeTodo}) => {
  return (
      <div className="todos">
        {
          todos.map((todo, index) => {
            let cls = ['row flex todos-item ']

            if (todo.completed) {
              cls.push('completed')
            }

            if (todo.important) {
              cls.push('important')
            }
            if(todo.important && todo.completed) {
              cls.push(' important completed')
            }

            return (
              <div key={todo._id}>
                {
                  todo.completed ? <div className={cls.join('')}>
                    <div className="col todos-num">Задача №{index + 1}</div>

                    <div className="col todos-text">{todo.text}</div>

                    <div className="col todos-buttons">
                      <span className='inline-date'>Выполнено: {todo.createdAt}</span>
                      <i
                        onClick={() => removeTodo(todo._id)}
                        className="material-icons  blue-text">delete</i>
                      <Link to={`/edit/${todo._id}`}>
                        <i className="material-icons  blue-text">create</i>
                      </Link>
                    </div>
                  </div> : ''
                }
              </div>
            )
          })
        }
      </div>
  );
};

export default CompletedTodos;