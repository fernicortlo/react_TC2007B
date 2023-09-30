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

export const TicketCreate = () => {
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
        notify('Ticket Creado', {undoable: true});
        redirect('/Tickets');
        refresh();   
        };
        if (error) { return <p>ERROR</p>; }
        // return <button disabled={isLoading} onClick={handleClick}>Like</button>;
        return(
                
                <Create mutationOptions={{handleClick}}>
                    <SimpleForm warnWhenUnsavedChanges>
                        <ReferenceInput source="Aula" reference="aula" label="aula"/>
                        <ReferenceInput source="Clasificación" reference="clasificacion" label="Clasificación"/>
                        <ReferenceInput source="Tipo" reference="tipo" label="Tipo"/>
                        <TextInput source="Comentarios" label="Comentarios" multiline rows={5} />
                    </SimpleForm>
                    <Button disabled={isLoading} onClick={handleClick}>Like</Button>
                 </Create>
                
                );
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


