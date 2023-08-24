import { useState } from 'react'
import {
    FormControl,
    FormLabel,
    Input,
    VStack,
    Box,
    InputGroup,
    InputRightElement,
    Button
} from '@chakra-ui/react'

const Login = () => {
 const [show, setShow] = useState(false)
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   

    const handleClick = () => setShow(!show);

    const postDetails = pics => { };

    const submitHandler = () => {

    }

    return (
      <VStack spacing='5px'>
         
                <FormControl id='email' isRequired>
                    <FormLabel>Email</FormLabel>
                    <Box mb={'15px'}>
                        <Input
                            placeholder='Enter email'
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Box>
                </FormControl>

                <FormControl id='password' isRequired>
                    <FormLabel>Password</FormLabel>
                    <Box mb={'15px'}>
                    <InputGroup>
                        <Input
                            type={show ? 'text' : 'password'}
                           placeholder='Enter password'
                           onChange={e => setPassword(e.target.value)}
                        />
                        <InputRightElement width='4.5rem'>

                            <Button h={'1.75rem'} size={'sm'} onClick={handleClick}>

                                {show ? "Hide" : "Show"}
                            </Button>
                        </InputRightElement>
                        </InputGroup>
                        </Box>
                </FormControl>
               
                <Button
                    colorScheme='purple'
                    width={'100%'}
                    style={{ marginTop: 15 }}
                    onClick={submitHandler}
                >
                    Login

                </Button>
                
            <Button
                variant={'solid'}
                    colorScheme='red'
                    width={'100%'}
                    style={{ marginTop: 15 }}
                onClick={() => {
                    setEmail("guest@example.com")
                    setPassword("123456")
                    }}
                >
                    Login as Guest

                </Button>
                  
              
        
      </VStack>
  )
}


export default Login