// Esta es una prueba -> holaaaad
import { useRecordContext} from "react-admin";
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
    useRedirect
} from "react-admin";

const AlbumFilters = [
    <TextInput source="q" label="Buscar" alwaysOn />,
    <ReferenceInput source="userId" label="Usuario" reference="users" />,
];

export const AlbumList = () => (
    <List filters={AlbumFilters}>
        <Datagrid>
            <TextField source="id" />
            <ReferenceField source="userId" reference="users" link="show" label="ID_Usuario" />
            <TextField source="title" label="Título" />
            <EditButton />
        </Datagrid>
    </List>
);
const AlbumTitle = () => {
    const record = useRecordContext();
    return <span>Album {record ? `"${record.title}"` : ''}</span>;
    };

    export const AlbumEdit = () => {
        const notify= useNotify();
        const refresh = useRefresh();
        const redirect = useRedirect();
        const onSuccess = () => {
            notify('Album Editado', {undoable: true});
            redirect('/albums');
            refresh();
        };
        return(
        <Edit title={<AlbumTitle />} mutationOptions={{onSuccess}}>
            <SimpleForm>
                <TextInput source="id" disabled />
                <ReferenceInput source="userId" reference="users" label="Usuario" />
                <TextInput source="title" label="Título" />
                <TextInput source="body" multiline rows={5} label="Cuerpo" />
            </SimpleForm>
        </Edit>)
    };
export const AlbumCreate = () => {
    const notify= useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();
    const onSuccess = () => {
        notify('Album Creado', {undoable: true});
        redirect('/albums');
        refresh();
    };
    return(
        <Create mutationOptions={{onSuccess}}>
        <SimpleForm>
            <ReferenceInput source="userId" reference="users" label="Usuario" />
            <TextInput source="title" label="Título" />
            <TextInput source="body" multiline rows={5} label="Cuerpo" />
        </SimpleForm>
     </Create>
    ) 
};