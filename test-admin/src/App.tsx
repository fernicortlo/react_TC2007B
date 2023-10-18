import React from "react";
import { Admin, Resource, CustomRoutes,menu } from "react-admin";
import {  Route} from 'react-router-dom';
import dataProvider from "./dataProvider";
import {i18nProvider} from './i18nProvider';
import { authProvider } from './authProvider';
import MyLoginPage from './MyLoginPage';
import { TicketCreate,TicketList, TicketEdit } from "./TicketSupAula";
import { TicketTerminadoList, TicketFEdit } from "./Finalizado";
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle';
import Registrarse from "./registrarse";
import MyLayout from "./MyLayout";
import { lightTheme, darkTheme } from './theme';
import {useTheme} from '@mui/material/styles';
import  {MyMenu} from "./myMenu";
import Reportes from "./Reportes";
import {HistorialList} from "./Historial";
import MyBarChart from "./graficas/barratxa";
import CustomPieChart from "./graficas/piepxt";
import Graphs from "./graficas/graficas";






const ThemedIconF = () => {
  const theme = useTheme();
  return <PlaylistAddCheckCircleIcon style={{ color: theme.palette.mode === 'dark' ? '#b4d5b1' : '#b53f3f', }} />;
};

const ThemedIcon = () => {
  const theme = useTheme();
  return <PlaylistAddCircleIcon style={{ color: theme.palette.mode === 'dark' ? '#b4d5b1' : '#b53f3f', }} />;
};
export const App = () => (
  <Admin layout={MyLayout} 
          loginPage={MyLoginPage} 
          authProvider={authProvider} 
          dataProvider={dataProvider}  
          i18nProvider= {i18nProvider}  
          theme={lightTheme}
          darkTheme={darkTheme}
          menu={MyMenu}>

    <Resource
        name="Tickets"
        list={TicketList}
        create={TicketCreate}
        icon={ThemedIcon}
        edit={TicketEdit}
    />
    <Resource
        name="Historial"
        list={HistorialList}
        icon={ThemedIcon}
    />
    <Resource
        name="Finalizado"
        list={TicketTerminadoList}
        edit={TicketFEdit}
        icon={ThemedIconF}/>

    <CustomRoutes>
          <Route path="/registrarse"  element={<Registrarse />}/>
          <Route path="/Reportes"  element={<Reportes />}/>
          <Route path="/graficas" element={<Graphs />} />
     </CustomRoutes>
  </Admin>
);