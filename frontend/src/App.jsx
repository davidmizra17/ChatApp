import { useState } from 'react'

import { Route } from "react-router-dom"

import './App.css'
import HomePage from './Pages/HomePage'
import Chat from './Pages/Chat'

function App() {
  

  return (
    <>
      <div className='App'>
        <Route path="/" component={HomePage} exact />
        <Route path="/chats" component={Chat} />
        
      </div>
      
    </>
  )
}

export default App
