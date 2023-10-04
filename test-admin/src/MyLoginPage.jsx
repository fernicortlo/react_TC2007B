import { useState } from 'react';
import { useLogin, useNotify, Notification, Button} from 'react-admin';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
const MyLoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const login = useLogin();
    const notify = useNotify();

    const handleSubmit = e => {
        e.preventDefault();
        // will call authProvider.login({ correo, pass })
        login({ correo: email, pass: password }).catch(() =>
            notify('Invalid email or password')
        );
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

