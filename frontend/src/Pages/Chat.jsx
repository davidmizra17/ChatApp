import React, { useEffect, useState } from 'react'
import axios from "axios"

const Chat = () => {

    const [chats, setChats] = useState([]);

    const fetchChats = async () => {
        const { data } = await axios.get('http://127.0.0.1:8000/api/chat')
        setChats(data)
    }

    useEffect(() => {
        fetchChats();
    }, [])
  return (
      <div>{chats.map(chat => (
          <div key={chat._id}>{chat.chatName}</div>
      ))}</div>
  )
}

export default Chat