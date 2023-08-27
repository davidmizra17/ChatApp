import { useState } from 'react'
import { Box, Tooltip, Text, Button } from '@chakra-ui/react';
import {Menu, MenuButton, MenuDivider,MenuItem,MenuList} from "@chakra-ui/menu";
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { Avatar } from "@chakra-ui/avatar"
import { ChatState } from "../../context/ChatProvider";
import { Center, Square, Circle } from '@chakra-ui/react'

export const SideDrawer = () => {

  const [search, setSearch] = useState("");
  const [searchResult, setsearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  const { user } = ChatState()

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
          <Button variant={'ghost'}> 
            <i className="fa-solid fa-magnifying-glass"></i>
            
            <Text d={{ base: 'none', md: 'flex' }} px={'4'} content='center'>
              
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
              <BellIcon fontSize={'2xl'} m={1}/>
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} >
              
              <Avatar size='sm' cursor='pointer' name={user.name} src={ user.pic } />
            </MenuButton>
            <MenuList>
              <MenuItem>My Profile</MenuItem>
              <MenuItem>Logout</MenuItem>

            </MenuList>
          </Menu>
        </div>
      </Box>
    </>
  )
}

