import { useEffect } from "react"
import {useSelector, useDispatch} from 'react-redux'
import {startLoading, stopLoading, login} from './slice'


export const saveUserDataToLocalStore = ({id, token}) => {
  localStorage.setItem('userData', JSON.stringify({
        userId: id,
        token: token
      }))
}

export const useAuth = () =>{
  const isLoading = useSelector(state => state.auth.isLoading)
  const dispatch = useDispatch()
  
  useEffect(()=> {
    dispatch(startLoading())
    const data = JSON.parse(localStorage.getItem('userData'))
    if(data){
      dispatch(login({token: data.token, id: data.userId}))
    }
    dispatch(stopLoading())
  },[dispatch])

  return isLoading
}