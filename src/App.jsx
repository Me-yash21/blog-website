import React, { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import authService from './appwrite/auth'
import {logout, logIn } from './store/authSlice'
import { Header, Footer } from './components'
import {Outlet} from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  
  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData) =>{
      if(userData){
        dispatch(logIn({userData}))
      }else{
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  },[])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-500'>
      <div className='w-full block' >
         <Header/>
        <main>
         <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ) : (<div>...Loading</div>)
}

export default App
