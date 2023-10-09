
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
import { getUserId,getUserRol } from "./authState";


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
    
    let rol = getUserRol();
    if(rol === 'Supervisor de Aula'){
    return (
        <Create mutationOptions={{ onSuccess }}>
            <SimpleForm>
                <TextInput source="rol" label="Rol" defaultValue={getUserRol()} disabled/>
                <TextInput source="aula" label="Aula" defaultValue={getUserId()} disabled/>
                <SelectInput source="clasificacion" label="Clasificación" choices={clasificacionChoices} onChange={handleClasificacionChange} required={true}/>
                <SelectInput source="tipo" label="Tipo" choices={tipoChoices} required={true}/>
                <SelectInput source="prioridad" label="Prioridad" choices={prioridadChoices} required={true}/>
                <SelectInput source="estatus" label="Estatus" choices={estatusChoices} defaultValue="no iniciado" required={true} />
                <TextInput source="comentario"  label="Comentario" multiline rows={5} required={true}/>
                <TextInput source="folio"  label="numeroOficio" multiline rows={1}/>
                
            </SimpleForm>
        </Create>
    );
    }
    else if(rol === 'Supervisor Nacional' || rol=== 'Supervisor Ejecutivo'){
        return (
            <Create mutationOptions={{ onSuccess }}>
                <SimpleForm>
                    <TextInput source="rol" label="Rol" defaultValue={getUserRol()} disabled/>
                    <TextInput source="aula" label="Aula"/>
                    <SelectInput source="clasificacion" label="Clasificación" choices={clasificacionChoices} onChange={handleClasificacionChange}/>
                    <SelectInput source="tipo" label="Tipo" choices={tipoChoices}/>
                    <SelectInput source="prioridad" label="Prioridad" choices={prioridadChoices}/>
                    <SelectInput source="estatus" label="Estatus" choices={estatusChoices} defaultValue="no iniciado" />
                    <TextInput source="comentario"  label="Comentario" multiline rows={5} />
                    <TextInput source="folio"  label="numeroOficio" multiline rows={1}/>
                    
                </SimpleForm>
            </Create>
        );
    }
};

const TicketFilters = [
        <TextInput source="q" label="Buscar" alwaysOn />,
        <ReferenceInput source="aula" label="Aula" reference="aula" />,
        <ReferenceInput source="clasificacion" label="Clasificacion" reference="clasificacion" />,
    ];
    
export const TicketList = () => (
    <List filters={TicketFilters}>
        <Datagrid>
             <TextField source="id" />
             <TextField source="aula" />
             <TextField source="clasificacion" />
             <TextField source="tipo" />
             <TextField source="comentario" />
             <TextField source="estatus" />
             <TextField source="prioridad" />
             <TextField source="fechaCreacion" /> 
             <TextField source="rol" />
             <TextField source="folio" />
             <EditButton />
        </Datagrid>
        </List>
    );


