import {
    FormControl,
    FormLabel,
    Input,
    VStack,
    Box,
    InputGroup,
    InputRightElement,
    Button,
    useToast
} from '@chakra-ui/react'
import { useState } from 'react'
import { useHistory } from 'react-router';
import axios, {isCancel, AxiosError} from 'axios';

const SignUp = () => {
    const [show, setShow] = useState(false)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [pic, setPic] = useState();
    const [loading, setLoading] = useState(false)
    
    const toast = useToast();
    const history = useHistory(); 

    const handleClick = () => setShow(!show);

    const postDetails = pics => {
        setLoading(true);
        if (pic === undefined) {
            toast({
                title: 'Please Select an Image!',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
            return;
        }

        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics)
            data.append("upload_preset", "ChatEz");
            data.append("cloud_name", "dx6wixhkm");
            fetch("https://api.cloudinary.com/v1_1/dx6wixhkm/image/upload", {
                method: 'post',
                body: data,

            }).then((res) => res.json())
                .then(data => {
                    setPic(data.url.toString());
                    setLoading(false)
                });
                
        } else {
            toast({
                title: 'Please Select an Image!',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
            setLoading(false);
            return;
            }
     };

    const submitHandler = async () => {
        setLoading(true);
        console.log("EMPIEZA HANDLER")

        if (!name || !email || !password || !confirmPassword) {
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
        console.log(name, email, password, pic);

        if (password != confirmPassword) {
            toast({
                title: 'Passwords Do Not Match!',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
            return;
        }
        console.log(name, email, password, pic);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            }
            const { data } = await axios.post(
                "http://localhost:8000/api/user",
                {
                    name,
                    email,
                    password,
                    pic
                },
                config
            );
            console.log(data)
            toast({
                title: 'Registration Successful',
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
                title: 'Error Occured During Registration!',
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
                isLoading={loading}
                >
                    Sign Up

                </Button>
                  
              
        
      </VStack>
  )
}

export default SignUp