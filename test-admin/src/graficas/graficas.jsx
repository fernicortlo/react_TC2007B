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


const Terminados = () => {
    const theme = useTheme();
    return <FactCheckIcon style={{ color: theme.palette.mode === 'dark' ? '#b4d5b1' : '#b53f3f' }} />;
  };

  const Creados = () => {
    const theme = useTheme();
    return <ListAltIcon style={{ color: theme.palette.mode === 'dark' ? '#b4d5b1' : '#b53f3f' }} />;
  }; 

const Graphs = () => {
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
    <Typography variant="h3">Filtros</Typography>
    <Box
        sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        }}
    >
        <SimpleForm>
        <DateInput source="Fecha inicial" />  
        <DateInput source="Fecha final" />  
        </SimpleForm>
    </Box>
        </Paper>
    
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
        <Typography variant="h4">{5}</Typography>
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
        <Typography variant="h5">{5}</Typography>
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
  );
};

export default Graphs;
// import React, { useEffect, useState } from 'react';
// //import BarTA from './BarTA';
// import CustomPieChart from './piepxt';
// import {
//   Box,
//   Paper,
//   Typography,
//   Grid,
// } from '@mui/material';
// import { DateInput, SimpleForm } from 'react-admin';

// const Graphs = () => {
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [formattedData, setformattedData] = useState([]);

//   // Add a function to update the date range based on user input
//   const handleDateChange = (startDate, endDate) => {
//     setStartDate(startDate);
//     setEndDate(endDate);
//   };

//   // Fetch data based on the selected date range and pass it to CustomPieChart
//   const fetchData = () => {
//     if (startDate && endDate) {
//       fetch(`http://localhost:1337/problemaTickets?startDate=${startDate}&endDate=${endDate}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authentication': localStorage.getItem("auth"),
//         },
//       })
//       .then((response) => response.json())
//       .then((ticketCounts) => {
//         // Process the data from the API and format it as needed
//         const formattedData = ticketCounts.map((item) => ({
//           name: item._id,
//           value: item.tickets,
//         }));

//         setformattedData(formattedData);
//       })
//         .catch((error) => console.error(error));
//     }
//     else {
//         fetch('http://localhost:1337/problemaTickets', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authentication': localStorage.getItem("auth"),
//           },
//         })
//         .then((response) => response.json())
//         .then((ticketCounts) => {
//           // Process the data from the API and format it as needed
//           const formattedData = ticketCounts.map((item) => ({
//             name: item._id,
//             value: item.tickets,
//           }));
  
//           setformattedData(formattedData);
//         })
//           .catch((error) => console.error(error));
//       }
//   };

//   useEffect(() => {
//     fetchData(); // Fetch data when component mounts
//   }, [startDate, endDate]);

//   return (
//     <Box
//       sx={{
//         display: 'grid',
//         gridTemplateColumns: 'repeat(2, 1fr)',
//         gap: 5,
//         textAlign: 'center',
//       }}
//     >
//       <Paper elevation={3} sx={{ p: 3 }}>
//         <Typography variant="h3">Filtros</Typography>
//         <Box
//           sx={{
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}
//         >
//           {/* Your date input component here */}
//           <DateInput source="startDate" onChange={handleDateChange} />
//           <DateInput source="endDate" onChange={handleDateChange} />
//         </Box>
//       </Paper>
//       <Paper elevation={3} sx={{ p: 3 }}>
//         <Typography variant="h3">Tickets por tipo</Typography>
//         <Box
//           sx={{
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}
//         >
//           <CustomPieChart chartData={formattedData} />
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default Graphs;
