import React from "react";
import './App.scss'
import MainPage from "./pages/MainPage/MainPage";
import {Route, Routes} from "react-router-dom";
import AuthPage from "./pages/AuthPage/AuthPage";
import {Layout} from "./Layouts/Layout";
import {RequireAuth} from "./hoc/RequireAuth";
import Error from "./pages/404/Error";
import Login from "./pages/AuthPage/Login/Login";
import Registration from "./pages/AuthPage/Registration/Registration";
import EditPage from "./pages/EditPage/EditPage";
import {useAuth} from './store/auth/hooks'

function App() {
const isLoading = useAuth()

  if(isLoading){
    return <div>Загрузка...</div>
  }

  return (
      <div className="app">
        <Routes>
         <Route path='/' element={<Layout/>}>
           <Route  element={<RequireAuth/>}>
             <Route index element={<MainPage/>}/>
             <Route path='edit/:id' element={<EditPage/>}/>
           </Route>
           <Route   element={<AuthPage/>} >
             <Route path='login' element={<Login /> }/>
             <Route path='registration' element={<Registration/> }/>
           </Route>
           <Route  path='*'   element={<Error/>} />
         </Route>
        </Routes>
      </div>
  )
}

export default App
