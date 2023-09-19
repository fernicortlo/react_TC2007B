import {
    List,
    Datagrid,
    TextField,
    ReferenceField,
    EditButton,
    Edit,
    Create,
    SimpleForm,
    ReferenceInput,
    TextInput, 
    useNotify, 
    useRefresh, 
    useRedirect,
    SimpleList,
} from "react-admin";
import { useRecordContext} from "react-admin";
import { SavedQueriesList, FilterLiveSearch, FilterList, FilterListItem } from 'react-admin';
import { Card, CardContent } from '@mui/material';
import MailIcon from '@mui/icons-material/MailOutline';
import CategoryIcon from '@mui/icons-material/LocalOffer';
import { useUpdate, useCreate} from 'react-admin';



const PostTitle = () => {
      const record = useRecordContext();
      return <span>Post {record ? `"${record.title}"` : ''}</span>;
    };

export const PostList = () => {
    <List aside={<PostFilterSidebar/>}>
        <Datagrid>
            <TextField source="id" />
            <ReferenceField source="userId" reference="users" link="show" label="ID_Usuario" />
            <TextField source="title" label="título" />
            <TextField source="body" label="cuerpo" />
            <EditButton />
        </Datagrid>
    </List>
};


export const PostEdit = () => {
    const notify= useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();
    const onSuccess = () => {
        notify('Publicación Actualizada', {undoable: true});
        redirect('/posts');
        refresh();
    };
    return(
        <Edit title={<PostTitle />} mutationOptions={{onSuccess}}>
        <SimpleForm>
            <TextInput source="id" disabled />
            <ReferenceInput source="userId" reference="users" label="ID_usuario" />
            <TextInput source="title" label="título"/>
            <TextInput source="body" multiline rows={5} label="cuerpo" />
        </SimpleForm>
    </Edit>
    );
};
    
export const PostCreate = () => {
    const notify= useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();
    const record = useRecordContext();
    const ticket = { 
            postId: record.id,
            user: record.userId,
            date: new Date().toISOString(),
            comment: 'This is a new ticket'};

    const [create, { isLoading, error }] = useCreate('ticket', { data: ticket });
    const handleClick = () => {
        create();
        notify('Publicación Creada', {undoable: true});
        redirect('/posts');
        refresh();   
        };
        if (error) { return <p>ERROR</p>; }
        return <button disabled={isLoading} onClick={handleClick}>Like</button>;
    };

    const postFilters = [
        <TextInput source="q" label="Buscar" alwaysOn />,
        <ReferenceInput source="userId" label="Usuario" reference="users" />,
    ];


export const PostFilterSidebar = () => (
    <Card sx={{ order: -1, mr: 2, mt: 9, width: 500 }}>
        <CardContent>
            <FilterLiveSearch />
            <FilterList label="Category" icon={<CategoryIcon />}>
                <FilterListItem label="ID" value={{ category: 'ID' }} />
                <FilterListItem label="Users" value={{ category: 'users' }} />
                <FilterListItem label="title" value={{ category: 'title' }} />
                <FilterListItem label="Body" value={{ category: 'body' }} />
            </FilterList>
        </CardContent>
    </Card>
);