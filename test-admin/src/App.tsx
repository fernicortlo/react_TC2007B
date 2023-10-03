// import { Admin, Resource, ShowGuesser } from "react-admin";
// import { dataProvider } from './dataProvider';
// import { PostList, PostEdit, PostCreate } from "./posts";
// import { AlbumList, AlbumEdit, AlbumCreate } from "./albums";
// import { UserList } from "./users";
// import PostIcon from "@mui/icons-material/Book";
// import UserIcon from "@mui/icons-material/Group";
// import AlbumIcon from '@mui/icons-material/Album';
// import { Dashboard } from './Dashboard';
// import { authProvider } from './authProvider';
// import { i18nProvider } from './i18nProvider';
// import MyLayout  from './MyLayout';
// import MyLoginPage from "./MyLoginPage";


// export const App = () => (
//   <Admin loginPage={MyLoginPage} authProvider={authProvider} dataProvider={dataProvider} dashboard={Dashboard} i18nProvider={i18nProvider}>
//         <Resource 
//             name="posts"
//             //list={PostList}
//             edit={PostEdit}
//             create={PostCreate}
//             icon={PostIcon}
//             options={{label: 'Publicaciones'}}
//         />
//         <Resource
//             name="users"
//             list={UserList}
//             show={ShowGuesser}
//             recordRepresentation="name"
//             icon={UserIcon}
//             options={{label: 'Usuarios'}}
//         />
//         <Resource 
//             name="albums"
//             list={AlbumList}
//             edit={AlbumEdit}
//             create={AlbumCreate}
//             icon={AlbumIcon}
//             options={{label: 'Álbums'}}
//         />
        
        
//     </Admin>
// );

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
import { TicketCreate,TicketList } from "./TicketSupAula";
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import Registrarse from "./registrarse";


export const App = () => (
  <Admin layout= {MyLayout} loginPage={MyLoginPage} authProvider={authProvider} dataProvider={dataProvider}  i18nProvider= {i18nProvider} >
      {/* <Resource 
          name="posts"
          list={PostList}
          edit={PostEdit}
          create={PostCreate}
          icon={PostIcon}
          options={{label:"Publicaciones"}}
      />
      <Resource
          name="users"
          list={UserList}
          show={ShowGuesser}
          recordRepresentation="name"
          icon={UserIcon}
          options={{label:"Usuarios"}}
      />
      <Resource 
          name="Albums"
          list={AlbumList}
          edit={AlbumEdit}
          create={AlbumCreate}
          icon={AlbumIcon}
          options={{label:"Álbumes"}}
      /> */}

    {/* <Resource
        name="CrearTickets"
        list={null}
        create={TicketCreate}
        icon={PostAddIcon}
    /> */}

    <Resource
        name="Tickets"
        list={TicketList}
        create={TicketCreate}
        icon={PlaylistAddCheckCircleIcon}
    />
    <CustomRoutes>
          <Route path="/registrarse"  element={<Registrarse />}/>
        </CustomRoutes>
  </Admin>
);