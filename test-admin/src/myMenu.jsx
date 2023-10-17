import { Menu } from 'react-admin';
import { useTheme } from '@mui/material/styles';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { getUserRol } from './authState';


const ThemedIcon = () => {
    const theme = useTheme();
    return <PersonAddAltIcon style={{ color: theme.palette.mode === 'dark' ? '#b4d5b1' : '#b53f3f', }} />;
  };
  
const ReportesIcon = () => {
    const theme = useTheme();
    return <AssessmentIcon style={{ color: theme.palette.mode === 'dark' ? '#b4d5b1' : '#b53f3f' }} />;
  };


export const MyMenu = () => {
    const rol = localStorage.getItem('rol');
    return(
    <Menu>
        {rol !== "Administrador" &&
        <Menu.ResourceItem name="Tickets" />}
        {rol==="Administrador" &&
        <Menu.Item to="/registrarse" primaryText="Registrarse" leftIcon={<ThemedIcon/>}/> }
        {rol!=="Administrador" &&
        <Menu.Item to="/Reportes" primaryText="Reportes" leftIcon={<ReportesIcon/>}/>}
        {rol!=="Administrador" &&
        <Menu.Item to="/barChart" primaryText="Barras" leftIcon={<ReportesIcon/>}/>}
    </Menu>
    );
};
