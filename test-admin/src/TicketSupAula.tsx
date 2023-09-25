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
                        <ReferenceInput source="Lugar" reference="lugar" label="Lugar"/>
                        <ReferenceInput source="Problema" reference="problema" label="Problema"/>
                        <TextInput source="Descripción del problema" label="Descripción del problema" multiline rows={5} />
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
                <ReferenceField source="userId" reference="users" link="show" label="ID_Usuario" />
                <TextField source="title" label="Título" />
                <EditButton />
        </Datagrid>
        </List>
    );


