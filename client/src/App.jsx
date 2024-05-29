import { useEffect, useState } from 'react'
import './App.css'
import {BrowserRouter , Routes , Route, Navigate} from 'react-router-dom'
import Register from './components/Register'
import Main from './components/Main'
import Account from './components/profiles/Account'
import MainProfile from './components/profiles/MainProfile'



function App() {

  return (
    <>
    <BrowserRouter>
    {localStorage.getItem('state')
    ?
      <Routes>
        <Route path='/' element={<Navigate to='/main'/>}></Route>
        <Route path='/main' element={<Main />}/>
        <Route path='/account/:id' element={ <Account /> } />
        <Route path='/account/main' element={ <MainProfile /> } />
      </Routes>
    : 
        <Routes>
          <Route path='/' element={<Register/>}></Route>
          <Route path='/main' element={ <Navigate to='/'/> } />
        </Routes>
    }
    
    </BrowserRouter>
    </>
  )
}

export default App
