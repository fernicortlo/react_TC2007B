import React, { useState, useEffect } from 'react';
import { useLogin, useNotify, Notification, Button, useRedirect} from 'react-admin';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import authProvider from './authProvider';
import { getUserRol } from './authState';

const MyLoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const login = useLogin();
    const notify = useNotify();
    const redirect = useRedirect();
    const theme = useTheme(); // using useTheme hook to access the current theme
    
    useEffect(() => {
        document.body.style.backgroundColor = theme.palette.mode === 'dark' ? '#121212' : '#fafafb';

    return () => document.body.style.backgroundColor = null;
    }, [theme.palette.mode]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await authProvider.login({ correo: email, pass: password });
            notify('Inicio de sesión exitoso');
            let rol = getUserRol();
            if (rol === 'Administrador') {
                redirect('/registrarse');
            } else {
                redirect('/tickets');
            }

        } catch (error) {
            notify('Correo electrónico o contraseña inválidos');
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
            alignContent: 'center',
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
