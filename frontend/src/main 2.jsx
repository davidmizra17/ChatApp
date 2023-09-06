import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import { ChatProvider } from "./context/ChatProvider";
import { BrowserRouter } from "react-router-dom"
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <ChatContext.Provider>
    <BrowserRouter>
      <ChakraProvider>
        <ChatProvider>
          <App />
        </ChatProvider>
      </ChakraProvider>
      </BrowserRouter>
  // </ChatContext.Provider>,
)
