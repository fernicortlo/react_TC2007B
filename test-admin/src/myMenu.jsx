import { Menu } from 'react-admin';
import { useTheme } from '@mui/material/styles';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AnalyticsIcon from '@mui/icons-material/Analytics';


const ThemedIcon = () => {
    const theme = useTheme();
    return <PersonAddAltIcon style={{ color: theme.palette.mode === 'dark' ? '#b4d5b1' : '#b53f3f', }} />;
  };
  
const ReportesIcon = () => {
    const theme = useTheme();
    return <AssessmentIcon style={{ color: theme.palette.mode === 'dark' ? '#b4d5b1' : '#b53f3f' }} />;
  };

const Graficas = () => {
    const theme = useTheme();
    return <AnalyticsIcon style={{ color: theme.palette.mode === 'dark' ? '#b4d5b1' : '#b53f3f' }} />;
  };



export const MyMenu = () => {
    const rol = localStorage.getItem('rol');
    return(
    <Menu>
        {rol !== "Administrador" &&
        <Menu.ResourceItem name="Tickets" />}
        {rol === "Administrador" &&
        <Menu.ResourceItem name="Usuarios" />}
        {rol==="Administrador" &&
        <Menu.Item to="/registrarse" primaryText="Registrarse" leftIcon={<ThemedIcon/>}/> }
        {rol === 'Supervisor Nacional' || rol=== 'Supervisor Ejecutivo' &&
        <Menu.Item to="/Reportes" primaryText="Reportes" leftIcon={<ReportesIcon/>}/>}
        {rol === 'Supervisor Nacional' || rol=== 'Supervisor Ejecutivo' &&
        <Menu.Item to="/graficas" primaryText="Graficas" leftIcon={<Graficas/>}/>}
    </Menu>
    );
};
