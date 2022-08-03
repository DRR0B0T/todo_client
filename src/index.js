import React from 'react'
import * as ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import {BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux' 
import store from './store/config'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

