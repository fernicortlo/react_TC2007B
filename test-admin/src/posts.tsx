// in src/posts.tsx
import { useNotify, useRecordContext} from "react-admin";
import { Card, CardContent } from '@mui/material';
import CategoryIcon from '@mui/icons-material/LocalOffer';
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
    useRefresh,
    useRedirect,
    FilterList,
    FilterListItem,
    FilterLiveSearch,
    Button,
    useCreate,
} from "react-admin";

const postFilters = [
    <TextInput source="q" label="Buscar" alwaysOn />,
    <ReferenceInput source="userId" label="Usuarios" reference="users" />,
];

    export const PostList = () => (
    // <List filters={postFilters}>
     <List aside={<PostFilterSidebar/>}>
        <Datagrid>
            <TextField source="id" label="ID" />
            <ReferenceField source="userId" reference="users" label="Usuarios" link="show" />
            <TextField source="title" label ="Título" />
            <EditButton />
        </Datagrid>
    </List>
);
const PostTitle = () => {
    const record = useRecordContext();
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
    };

    export const PostEdit = () => {
        const notify= useNotify();
        const refresh= useRefresh();
        const redirect= useRedirect();
      
        const onSuccess=()=>{
            notify('Cambios guardados',{undoable:true});
            redirect('/posts');
            refresh();
        };

        return(
        <Edit title={<PostTitle />} mutationOptions={{onSuccess}}>
            <SimpleForm warnWhenUnsavedChanges>
                <TextInput source="id" disabled />
                <ReferenceInput source="userId" reference="users" label="Usuarios" />
                <TextInput source="title" label="Título"/>
                <TextInput source="body"  label="Cuerpo" multiline rows={5} />
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
                // postId: record.id,
                // user: record.userId,
                date: new Date().toISOString()
                // body: 'This is a new ticket'
            };
    
        const [create, { isLoading, error }] = useCreate('ticket', { data: ticket });
        const handleClick = () => {
            create();
            notify('Publicación Creada', {undoable: true});
            redirect('/posts');
            refresh();   
            };
            if (error) { return <p>ERROR</p>; }
            // return <button disabled={isLoading} onClick={handleClick}>Like</button>;
            return(
                    
                    <Create mutationOptions={{handleClick}}>
                        <SimpleForm warnWhenUnsavedChanges>
                            <ReferenceInput source="userId" reference="users" label="Usuarios"/>
                            <TextInput source="title"  label="Título"/>
                            <TextInput source="body" label="Cuerpo" multiline rows={5} />
                        </SimpleForm>
                        <Button disabled={isLoading} onClick={handleClick}>Like</Button>
                     </Create>
                    
                    );
        };

// 
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
)

