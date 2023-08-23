import React, { useEffect } from 'react'
import axios from "axios"

const Chat = () => {

    const fetchChats = async () => {
        const { data } = await axios.get('http://127.0.0.1:8000/api/chat')
        console.log(data)
    }

    useEffect(() => {
        fetchChats();
    }, [])
  return (
    <div>Chat</div>
  )
}

export default Chat