import { useState } from 'react';
import { useLogin, useNotify, Notification, Button, useRedirect} from 'react-admin';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
//import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import authProvider from './authProvider';
import { getUserRol } from './authState';
import "./css/login.css"

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
            notify('Login successful');
            let rol = getUserRol();
            // if(rol === 'Supervisor de Aula'){
            //     redirect('/Tickets')
            // }
            // else if (rol === 'Supervisor Nacional' || rol=== 'Supervisor Ejecutivo'){
            //     redirect('/TicketsNA')
            // }
            redirect('/Tickets')

        } catch (error) {
            // Handle login failure
            notify('Invalid email or password');
        }
    };
    

    return (
        // <Container component="main" maxWidth="xs" backgroundColor="red" >
       
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            alignContent: 'center'
          }}
        >
          <img src='src/logo2.png' alt="Logo Image" width="400" height="400" />
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
        // </Container>
    );
};

export default MyLoginPage;

