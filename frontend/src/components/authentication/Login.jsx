import { useState } from 'react'
import { useHistory } from 'react-router'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
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
    const [loading, setLoading] = useState(false);
    const toast = useToast() 
    const history = useHistory()
   

    const handleClick = () => setShow(!show);

    const postDetails = pics => { };

    const submitHandler = async () => {
        
            setLoading(true);
            console.log("EMPIEZA HANDLER")

            if (!email || !password) {
                toast({
                    title: 'Please Fill the Required Fields!',
                    status: 'warning',
                    duration: 5000,
                    isClosable: true,
                    position: 'bottom'
                });
                setLoading(false);
                return;
            }
            // console.log(name, email, password, pic);

            
            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                    },
                }
                const { data } = await axios.post(
                    "http://localhost:8000/api/user/login",
                    {
                        email,
                        password,
                    },
                    config
                );
                console.log(data)
                toast({
                    title: 'Login Successful',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    position: 'bottom'
                });
                
                localStorage.setItem('userInfo', JSON.stringify(data));
                setLoading(false);
                history.push('/chats')

        
            } catch (error) {
                toast({
                    title: 'Error Occured During Login!',
                    description: error.response.data.message,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: 'bottom'
                });
                setLoading(false);
            }
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
                    isLoading={loading}
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