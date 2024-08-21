import React, { useState, useEffect } from 'react'
import { Triangle } from 'react-loader-spinner'
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
  ) : (
    <div className='flex items-center justify-center min-h-screen'>
    <Triangle
    visible={true}
    height="100"
    width="100"
    color="#8E3131"
    ariaLabel="triangle-loading"
    wrapperStyle={{}}
    wrapperClass=""
    />

    </div>
  )
  
}

export default App
