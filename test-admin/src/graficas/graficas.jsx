import React, { useEffect, useState } from 'react';
import BarTA from './barratxa'; // Assuming your component file is named BarTA.js
import CustomPieChart from './piepxt'; // Assuming your component file is named CustomPieChart.js
import {
    Box,
    Paper,
    Typography,
  } from '@mui/material';
import { PieChart } from 'recharts';
import ListAltIcon from '@mui/icons-material/ListAlt';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { useTheme } from '@mui/material/styles';
import { DateInput, SimpleForm } from 'react-admin';
import Ticketscreados from './ticketsCreados';
import TicketsFinalizados from './ticketsFinalizados';

const Terminados = () => {
    const theme = useTheme();
    return <FactCheckIcon style={{ color: theme.palette.mode === 'dark' ? '#b4d5b1' : '#b53f3f',fontSize:50 }} />;
  };

  const Creados = () => {
    const theme = useTheme();
    return <ListAltIcon style={{ color: theme.palette.mode === 'dark' ? '#b4d5b1' : '#b53f3f',fontSize:50 }} />;
  }; 



const Graphs = () => {
    if(localStorage.getItem('rol') === 'Supervisor Nacional' || localStorage.getItem('rol') === 'Supervisor Ejecutivo'){
    return (
        <Box
        sx={{
        display: { xs: 'flex', md: 'grid' },
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridAutoRows: 'minmax(100px, auto)',
        gap: 5,
        textAlign: 'center',
        flexDirection: 'column',
        }}
        >
        <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h3">Tickets creados</Typography>
        <Box
            sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            }}
        >
            <Creados sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
            <Ticketscreados />
        </Box>
            </Paper>
            <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h3">Tickets resueltos</Typography>
        <Box
            sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            }}
        >
            <Terminados sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
            <TicketsFinalizados />
        </Box>
            </Paper>
            <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h3">Tickets por aula</Typography>
        <Box
            sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            }}
        >
            {/* <MapsHomeWork sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} /> */}
            <BarTA />
        </Box>
            </Paper>
            <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h3">Tickets por tipo</Typography>
        <Box
            sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            }}
        >
            {/* <MapsHomeWork sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} /> */}
            <CustomPieChart />
        </Box>
            </Paper>
            
            </Box>
            // <div>
            // <div style={{ display: 'flex', justifyContent: 'center' }}>
            //     <BarTA />
            //     <CustomPieChart />
            // </div>
            // </div>
    );}
    else{
        return(
            <div>
              <h1>No tienes permisos para ver esta pagina</h1>
            </div>
             )
    }
};

export default Graphs;
