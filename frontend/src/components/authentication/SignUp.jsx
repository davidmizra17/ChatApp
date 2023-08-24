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
import { useState } from 'react'

const SignUp = () => {
    const [show, setShow] = useState(false)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [pic, setPic] = useState();

    const handleClick = () => setShow(!show);

    const postDetails = pics => { };

    const submitHandler = () => {

    }

    return (
      <VStack spacing='5px'>
          <FormControl id='first-name' isRequired>
                <FormLabel>Name</FormLabel>
                    <Box mb={'15px'}>
                        
                        <Input
                             placeholder='Enter your name'
                             onChange={e => setName(e.target.value)}
                        />
                </Box>
                </FormControl>
                
                
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
                           placeholder='Enter a password'
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
                <FormControl id='confirm password' isRequired>
                    <Box mb={'15px'}>
                        <FormLabel>Confirm Password</FormLabel>
                    <InputGroup>
                            <Input
                            type={show ? 'text' : 'password'}
                            placeholder='Confirm password'
                            onChange={e => setConfirmPassword(e.target.value)}
                            />
                        <InputRightElement width='4.5rem'>

                            <Button h={'1.75rem'} size={'sm'} onClick={handleClick}>

                                {show ? "Hide" : "Show"}
                            </Button>
                            </InputRightElement>
                            </InputGroup>
                    </Box>
                </FormControl>
                
                <FormControl id='pic'>
                    <FormLabel>Upload your Picture</FormLabel>
                    <Box>
                    <Input
                        type='file'
                        p={1.5}
                        accept='image/*'
                        onChange={e => postDetails(e.target.files[0])}
                        />
                    </Box>
                </FormControl>
                <Button
                    colorScheme='purple'
                    width={'100%'}
                    style={{ marginTop: 15 }}
                    onClick={submitHandler}
                >
                    Sign Up

                </Button>
                  
              
        
      </VStack>
  )
}

export default SignUp