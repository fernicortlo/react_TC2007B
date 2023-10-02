
import { useNotify, useRecordContext} from "react-admin";
import { Card, CardContent } from '@mui/material';
import CategoryIcon from '@mui/icons-material/LocalOffer';
import {
    List,
    Datagrid,
    TextField,
    // ReferenceField,
    EditButton,
    // Edit,
    Create,
    SimpleForm,
    ReferenceInput,
    TextInput,
    useRefresh,
    useRedirect,
    // FilterList,
    // FilterListItem,
    // FilterLiveSearch,
    // Button,
    // useCreate,
    SelectInput
} from "react-admin";
import React, { useState, ChangeEvent } from 'react';
import { ChoiceOption, clasificacionChoices, prioridadChoices, tipoChoicesMapping, estatusChoices } from './choices';

export const TicketCreate = () => {
    const notify= useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();
    

    const [tipoChoices, setTipoChoices] = useState<ChoiceOption[]>([]);

    const handleClasificacionChange = (event: React.ChangeEvent<{ name?: string; value: any }>) => {
        const selectedClasificacion = event.target.value as string;
        setTipoChoices(tipoChoicesMapping[selectedClasificacion] || []);
    };

    const onSuccess = () => {
        notify('Ticket Creado', {undoable: true});
        redirect('/Tickets');
        refresh();
    };

    return (
        <Create mutationOptions={{ onSuccess }}>
            <SimpleForm>
                <TextInput source="aula" label="Aula"/>
                <SelectInput source="clasificacion" label="Clasificación" choices={clasificacionChoices} onChange={handleClasificacionChange}/>
                <SelectInput source="tipo" label="Tipo" choices={tipoChoices}/>
                <SelectInput source="prioridad" label="Prioridad" choices={prioridadChoices}/>
                <SelectInput source="estatus" label="Estatus" choices={estatusChoices} defaultValue="no iniciado" />
                <TextInput source="comentario"  label="Comentario" multiline rows={5} />
                <TextInput source="rol" label="Rol"/>
            </SimpleForm>
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


