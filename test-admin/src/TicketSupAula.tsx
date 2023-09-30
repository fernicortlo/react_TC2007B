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
import { SelectInput} from "react-admin";


const servicios = [
    { id: 'Cómputo', name: 'Cómputo' },
    { id: 'Redes', name: 'Redes' },
    { id: 'Audiovisual', name: 'Audiovisual' },
    { id: 'Telefonía', name: 'Telefonía' },
    { id: 'Cableado', name: 'Cableado' },
    { id: 'Otros', name: 'Otros' },
];

export const TicketCreate = () => {
    const notify= useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();
    const onSuccess = () => {
        notify('Ticket Creado', {undoable: true});
        redirect('/Tickets');
        refresh();
    };
    return(
        <Create mutationOptions={{onSuccess}}>
        <SimpleForm>
                <TextInput source="aula" label="Aula"/>
                <SelectInput source="clasificacion" label="Clasificación" choices={servicios}/>
                <TextInput source="tipo" label="Tipo"/>
                <TextInput source="prioridad" label="Prioridad"/>
                <TextInput source="estatus" label="Estatus"/>
                <TextInput source="comentario"  label="Comentario" multiline rows={5} />
                <TextInput source="rol" label="Rol"/>
        </SimpleForm>
        </Create>
        ) 
    
    };


const TicketFilters = [
        <TextInput source="q" label="Buscar" alwaysOn />,
        <ReferenceInput source="userId" label="Usuario" reference="users" />,
    ];
    
export const TicketList = () => (
    <List filters={TicketFilters}>
        <Datagrid>
             <TextField source="id" />
             <TextField source="aula" />
             <TextField source="clasificacion" />
             <TextField source="tipo" />
             <TextField source="estatus" />
             <TextField source="prioridad" />
             <TextField source="fechaCreacion" /> 
             <TextField source="rol" />
             <EditButton />
        </Datagrid>
        </List>
    );


