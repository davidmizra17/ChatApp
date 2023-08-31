import { useState } from 'react'
import { Box, Tooltip, Text, Button, Input } from '@chakra-ui/react';
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  
} from "@chakra-ui/menu";

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { Avatar } from "@chakra-ui/avatar"
import { ChatState } from "../../context/ChatProvider";
import { Center, Square, Circle } from '@chakra-ui/react'
import ProfileModal from './ProfileModal';
import { useToast } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react';
import ChatLoading from '../ChatLoading'
import UserListItem from '../userAvatar/UserListItem';

export const SideDrawer = () => {

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const { user, setSelectedChat, chats, setChats } = ChatState();  
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast()
  
  const handleSearch = async () => {
    
    if (!search) {
      toast({
        title: 'Please insert name or email!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top-left'
      });
      return;
    }
    try {
      setLoading(true)
      const config = {
        
        headers: {
          Authorization: `Bearer ${user.token}`,
        }
      }
      const { data } = await axios.get(`http://localhost:8000/api/user?search=${search}`, config)
        
      setLoading(false);
      
      setSearchResult(data)

      if (data == 0) {
        toast({
          title: 'No data found',
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: 'top-left'
        })
        return;
        // console.log("no data found")
      }
      
      console.log(data)
      
    

      

    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });

    }
      
  }
  

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  const accessChat = async (userId) => {
    try {
      
      setLoadingChat(true)

      const config = {
        
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        }
      }

      const { data } = await axios.post('http://localhost:8000/api/chat', { userId }, config)

      if (!chats.find(c => c._id === data._id)) setChats([data, ...chats]);

      setSelectedChat(data);

      setLoadingChat(false);
      onClose();
    // const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      
      
      
    
  } catch (error) {
    toast({
      title: 'Error fetching chat',
      description: error.message,
      status: 'error',
      duration: 5000,
      isClosable: true,
      position: 'bottom'
    });
  }
  
  }

  return (
    <>
      <Box
        display='flex'
        justifyContent={'space-between'}
        alignItems={'center'}
        bg={'white'}
        w={'100%'}
        p={'5px 10px 5px 10px'}
        borderWidth={'5px'}
      >
        <Tooltip label="Search Users to chat with" hasArrow placement="bottom-end">
          <Button variant={'ghost'} onClick={onOpen}>
            <i className="fa-solid fa-magnifying-glass"></i>
            
            <Text display={{ base: 'none', md: 'flex' }} px={'4'}  >
              
              Search User
            </Text>
          </Button>

        </Tooltip>
        <Center>
          <Text fontSize={'2xl'} fontFamily={'Work sans'}>
            
            ChatEz
          </Text>
        </Center>
        <div>
          <Menu>
            <MenuButton p={1} className='nosecua' placement="right">
              <BellIcon fontSize={'2xl'} m={1} />
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} >
              
              <Avatar size='sm' cursor='pointer' name={user.name} src={user.pic} />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                {/* <MenuItem>My Profile</MenuItem> */}
              </ProfileModal>
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>

            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={'1px'}>
            Search Users
          </DrawerHeader>
        
        
          <DrawerBody>
          
            <Box display={'flex'} pb={2}>
            
              <Input
                placeholder='Search by name or email'
                mr={2}
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            
              <Button onClick={handleSearch}>Go</Button>
          
            </Box>

            {loading ? (
              <ChatLoading />
            ) : (
                
              searchResult?.map((user) => (
                  
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
        
    
        </DrawerContent>
      </Drawer>
    </>
  );
}

