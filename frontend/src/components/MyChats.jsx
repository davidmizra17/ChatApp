import { Box, Button, Stack, Text } from "@chakra-ui/react" 
import { AddIcon } from "@chakra-ui/icons"
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/toast";
import { ChatState } from "../context/ChatProvider";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { getSender } from "../config/ChatLogics";


export const MyChats = ({ fetchAgain }) => {

  const [loggedUser, setLoggedUser] = useState();
  const {
    selectedChat,
    setSelectedChat,
    user,
    chats,
    setChats
  } = ChatState()
  
  const toast = useToast()

  const fetchChats = async () => {
    try {
      
      const config = {
        headers: {
          Authentication: `Bearer ${user.token}`,
        },
      };
  
      const { chat } = await axios.get('http://localhost:8000/api/chat', config)
      setChats(chat)
    
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left"
      });
    };
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")))
    fetchChats()
  }, [fetchAgain])
  return (
    
      <Box
         display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      height={'100%'}
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
      >
      
        <Box
          pb={3}
        
          px={3}
          fontSize={{ base: "28px", md: "30px" }}
          fontFamily="Work sans"       
          display="flex"        
          width="100%"        
          justifyContent="space-between"        
          alignItems="center"
      >
        My Chats
        
        <GroupChatModal>

          <Button
            display="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
            >
            New Group Chat
          </Button>
            
        </GroupChatModal>
      </Box>
      
      <Box
        display={'flex'}
        flexDir={'column'}
        p={3}
        bg='#F8F8F8'
        width={'100%'}
        height={'100%'}
        // borderHeight='lg'
        
        overflow={'hidden'}
      >
        {chats ? (

          <Stack overflowY='scroll'>
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor={'pointer'}
                bg={selectedChat === chat ? '#38B2AC' : "#E8E8E8"}
                color={selectedChat === chat ? 'white' : 'black'}
                px={3}
                py={2}
                borderRadius={'lg'}
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat ?
                    getSender(loggedUser, chat.users)
                    : (chat.chatname)
                  }
                  
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
            <ChatLoading />
        )}
      </Box>

      </Box>
    
  )
}

