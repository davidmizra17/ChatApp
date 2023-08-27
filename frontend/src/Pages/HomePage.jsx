import React, { useEffect } from 'react'
import { Container, Box, Text, Tab, Tabs, TabList, TabPanel, TabPanels } from '@chakra-ui/react'
import Login from '../components/authentication/Login'
import SignUp from '../components/authentication/SignUp'
import { useHistory } from 'react-router-dom'
import { Center, Square, Circle } from '@chakra-ui/react'
const HomePage = () => {

  const history = useHistory();

  useEffect(() => {
    
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");

  }, [history])

  return (
    <Container maxW='xl' centerContent>
      
      <Box
        d='flex'
        justifyContent='center'
        p={3}
        bg='white'
        w='100%'
        m='40px 0 15px 0'
        borderRadius='lg'
        borderWidth='1px'

      >
        <Center>
          <Text fontSize='4xl' fontFamily='Work sans' className='nosecua'>ChatEZ</Text>
          </Center>
     
      </Box >

      <Box bg={'white'} w={'100%'} p={4} borderRadius={'lg'} borderWidth={'1px'} color={'black'}>
            <Tabs variant='soft-rounded' colorScheme='purple'>
                <TabList mb={'1em'}>
                  <Tab width={'50%'}>Login</Tab>
                  <Tab width={'50%'}>Sign Up</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Login />
                  </TabPanel>
                  <TabPanel>
                    <SignUp />
                  </TabPanel>
                </TabPanels>
              </Tabs>
      </Box>

    </Container>
  )
}

export default HomePage