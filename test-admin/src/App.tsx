import React from "react";
import { Admin, Resource, ShowGuesser, CustomRoutes } from "react-admin";
import {  Route} from 'react-router-dom';
import { dataProvider } from "./dataProvider";
import {i18nProvider} from './i18nProvider';
import { Dashboard } from './Dashboard';
import { authProvider } from './authProvider';
import MyLoginPage from './MyLoginPage';
import { TicketCreate,TicketList, TicketEdit } from "./TicketSupAula";
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import Registrarse from "./registrarse";
import MyLayout from "./MyLayout";
import { lightTheme, darkTheme } from './theme';
import {useTheme} from '@mui/material/styles';

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
          darkTheme={darkTheme} >

    <Resource
        name="Tickets"
        options={{ label: 'ColorTickets' }}
        list={TicketList}
        create={TicketCreate}
        icon={ThemedIcon}
        edit={TicketEdit}
    />
    <CustomRoutes>
          <Route path="/registrarse"  element={<Registrarse />}/>
        </CustomRoutes>
  </Admin>
);