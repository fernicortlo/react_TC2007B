// import React from 'react';
// import AssessmentIcon from '@mui/icons-material/Assessment';
// import {useTheme} from '@mui/material/styles';

// const ThemedIcon = () => {
//     const theme = useTheme();
//     return <AssessmentIcon style={{ color: theme.palette.mode === 'dark' ? '#b4d5b1' : '#b53f3f', }} />;
//   };

// const MyDashboard = () => {
//   <ThemedIcon/>
//   const embeddedDashboardUrl =
//     'https://charts.mongodb.com/charts-seguridad-nzbdy/embed/dashboards?id=a3b6519c-d802-4f16-adc6-905b6f305872&theme=dark&autoRefresh=true&maxDataAge=3600&showTitleAndDesc=false&scalingWidth=fixed&scalingHeight=fixed';

//     return (
//         <div>
//           <div style={{ display: 'flex', alignItems: 'center' }}>
//             <ThemedIcon />
//             <h1 style={{ marginLeft: '10px' }}>Reportes</h1>
//           </div>
//           <iframe
//             title="MongoDB Atlas Dashboard"
//             style={{
//               background: 'Transparent',
//               border: 'none',
//               borderRadius: '2px',
//               boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
//               width: '100%',
//               height: 'calc(100vh - 48px)', // Adjust the height to leave space for the header
//             }}
//             src={embeddedDashboardUrl}
//           ></iframe>
//         </div>
//       );
//     };
    

// export default MyDashboard;
import React from 'react';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { useTheme } from '@mui/material/styles';

const ThemedIcon = () => {
  const theme = useTheme();
  return <AssessmentIcon style={{ color: theme.palette.mode === 'dark' ? '#b4d5b1' : '#b53f3f' }} />;
};

const MyDashboard = () => {
  const embeddedDashboardUrl = "https://charts.mongodb.com/charts-seguridad-nzbdy/embed/dashboards?id=a3b6519c-d802-4f16-adc6-905b6f305872&theme=light&autoRefresh=true&maxDataAge=60&showTitleAndDesc=false&scalingWidth=fixed&scalingHeight=fixed";

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <ThemedIcon />
        <h1 style={{ marginLeft: '10px' }}>Reportes</h1>
      </div>
      <iframe
        title="MongoDB Atlas Dashboard"
        style={{
          background: 'transparent',
          border: 'none',
          borderRadius: '2px',
          boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
          width: '100%',
          height: 'calc(100vh - 48px)', // Adjust the height to leave space for the header
        }}
        src={embeddedDashboardUrl}
      ></iframe>
    </div>
  );
};

export default MyDashboard;
