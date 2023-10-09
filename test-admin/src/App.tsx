import React from "react";
import { Admin, Resource, ShowGuesser, CustomRoutes } from "react-admin";
import {  Route} from 'react-router-dom';
import { dataProvider } from "./dataProvider";
import { PostList, PostEdit, PostCreate } from "./posts";
import { UserList } from "./users";
import PostIcon from "@mui/icons-material/Book";
import UserIcon from "@mui/icons-material/Group";
import AlbumIcon from '@mui/icons-material/Album';
import {i18nProvider} from './i18nProvider';
import { Dashboard } from './Dashboard';
import { authProvider } from './authProvider';
import { AlbumList, AlbumEdit, AlbumCreate } from "./albums";
import MyLayout from './MyLayout';
import MyLoginPage from './MyLoginPage';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { TicketCreate,TicketList, TicketEdit } from "./TicketSupAula";
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import Registrarse from "./registrarse";


export const App = () => (
  <Admin layout= {MyLayout} loginPage={MyLoginPage} authProvider={authProvider} dataProvider={dataProvider}  i18nProvider= {i18nProvider} >

    <Resource
        name="Tickets"
        list={TicketList}
        create={TicketCreate}
        icon={PlaylistAddCheckCircleIcon}
        edit={TicketEdit}
    />
    <CustomRoutes>
          <Route path="/registrarse"  element={<Registrarse />}/>
        </CustomRoutes>
  </Admin>
);