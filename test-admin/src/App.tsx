import React from "react";
import { Admin, Resource, CustomRoutes,menu } from "react-admin";
import {  Route} from 'react-router-dom';
import { dataProvider } from "./dataProvider";
import {i18nProvider} from './i18nProvider';
import { authProvider } from './authProvider';
import MyLoginPage from './MyLoginPage';
import { TicketCreate,TicketList, TicketEdit } from "./TicketSupAula";
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import Registrarse from "./registrarse";
import MyLayout from "./MyLayout";
import { lightTheme, darkTheme } from './theme';
import {useTheme} from '@mui/material/styles';
import  {MyMenu} from "./myMenu";
import Reportes from "./Reportes";


const ThemedIcon = () => {
  const theme = useTheme();
  return <PlaylistAddCheckCircleIcon style={{ color: theme.palette.mode === 'dark' ? '#b4d5b1' : '#b53f3f', }} />;
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
    <CustomRoutes>
          <Route path="/registrarse"  element={<Registrarse />}/>
          <Route path="/Reportes"  element={<Reportes />}/>
     </CustomRoutes>
  </Admin>
);