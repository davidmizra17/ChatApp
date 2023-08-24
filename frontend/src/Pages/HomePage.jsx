import React from 'react'
import { Container, Box, Text, Tab, Tabs, TabList, TabPanel, TabPanels } from '@chakra-ui/react'
import Login from '../components/authentication/Login'
import SignUp from '../components/authentication/SignUp'
const HomePage = () => {
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
        
        <Text centerContent fontSize='4xl' fontFamily='work sans' color='black'>ChatEZ</Text>
     
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