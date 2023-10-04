import { useState } from 'react';
import { useLogin, useNotify, Notification, Button, useRedirect} from 'react-admin';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import authProvider from './authProvider';
const MyLoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const login = useLogin();
    const notify = useNotify();
    const redirect = useRedirect();
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Call the login function from authProvider
            await authProvider.login({ correo: email, pass: password });
            
            // If login is successful, you can redirect or handle it as needed
            // For example, you can use react-admin's redirection logic
            // or notify the user about successful login.
            notify('Login successful');
            redirect('/Tickets')

        } catch (error) {
            // Handle login failure
            notify('Invalid email or password');
        }
    };
    

    return (
        <Container component="main" maxWidth="xs" >
       
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            alignContent: 'center'
          }}
        >
          <img src='src/logoFundacion.png' alt="Your Image" width="200" height="200" />
          <Typography component="h1" variant="h5">
            Iniciar Sesión
          </Typography>
        <Box
            component="form"
            onSubmit={handleSubmit}  
            sx={{
                //'& .MuiTextField-root': { m: 1, width: '25ch' },
                '& .MuiButton-root': {
                    backgroundColor: 'green', // Button background color
                    color: 'white', // Button text color
                },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField 
                margin='normal'
                id="email" 
                label="Correo electrónico"
                autoComplete="email"
                required
                autoFocus
                fullWidth
                onChange={e => setEmail(e.target.value)}/>
            
            <TextField
                margin='normal'
                id="password" 
                label="Contraseña" 
                autoComplete="password"
                required
                fullWidth
                onChange={e => setPassword(e.target.value)}
            />
            <Button 
                variant='contained' 
                onClick={handleSubmit} 
                type='submit' 
                
                fullWidth>Iniciar Sesión</Button>
        </Box>
        </Box>
        </Container>
    );
};

export default MyLoginPage;

