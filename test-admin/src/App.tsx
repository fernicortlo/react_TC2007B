import { Admin, Resource, ShowGuesser } from "react-admin";
import { dataProvider } from './dataProvider';
import { PostList, PostEdit, PostCreate } from "./posts";
import { AlbumList, AlbumEdit, AlbumCreate } from "./albums";
import { UserList } from "./users";
import PostIcon from "@mui/icons-material/Book";
import UserIcon from "@mui/icons-material/Group";
import AlbumIcon from '@mui/icons-material/Album';
import { Dashboard } from './Dashboard';
import { authProvider } from './authProvider';
import { i18nProvider } from './i18nProvider';
import MyLayout  from './MyLayout';

export const App = () => (
  <Admin layout={MyLayout} authProvider={authProvider} dataProvider={dataProvider} dashboard={Dashboard} i18nProvider={i18nProvider}>
        <Resource 
            name="posts"
            list={PostList}
            edit={PostEdit}
            create={PostCreate}
            icon={PostIcon}
            options={{label: 'Publicaciones'}}
        />
        <Resource
            name="users"
            list={UserList}
            show={ShowGuesser}
            recordRepresentation="name"
            icon={UserIcon}
            options={{label: 'Usuarios'}}
        />
        <Resource 
            name="albums"
            list={AlbumList}
            edit={AlbumEdit}
            create={AlbumCreate}
            icon={AlbumIcon}
            options={{label: 'Álbums'}}
        />
        
        
    </Admin>
);

