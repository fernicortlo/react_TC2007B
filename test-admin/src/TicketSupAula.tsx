
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
    Edit,
    FilterList,
    FilterListItem,
    FilterLiveSearch,
    // Button,
    // useCreate,
    SelectInput,
    SearchInput,
    NumberInput,
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
                <TextInput source="folio"  label="Número de Oficio" multiline rows={1} required={true}/>
                
            </SimpleForm>
        </Create>
    );
    }
    else if(rol === 'Supervisor Nacional' || rol=== 'Supervisor Ejecutivo'){
        return (
            <Create mutationOptions={{ onSuccess }}>
                <SimpleForm>
                    <TextInput source="rol" label="Rol" defaultValue={getUserRol()} disabled/>
                    <TextInput source="aula" label="Aula" required={true}/>
                    <SelectInput source="clasificacion" label="Clasificación" choices={clasificacionChoices} onChange={handleClasificacionChange} required={true}/>
                    <SelectInput source="tipo" label="Tipo" choices={tipoChoices} required={true}/>
                    <SelectInput source="prioridad" label="Prioridad" choices={prioridadChoices} required={true}/>
                    <SelectInput source="estatus" label="Estatus" choices={estatusChoices} defaultValue="no iniciado" required={true}/>
                    <TextInput source="comentario"  label="Comentario" multiline rows={5} required={true}/>
                    <TextInput source="folio"  label="Número de Oficio" multiline rows={1} required={true}/>
                    
                </SimpleForm>
            </Create>
        );
    }
};

const TicketFilters = [
        //<SearchInput source="q" alwaysOn />,
        <SearchInput source="aula"/>,
        //<NumberInput source="id" label="ID" />, //Id no funciona.
        <SelectInput source="estatus" label="Estatus" choices={estatusChoices} />,
        <SelectInput source="prioridad" label="Prioridad" choices={prioridadChoices} />,
        <SelectInput source="clasificacion" label="Clasificacion" choices={clasificacionChoices} />,
        //<SelectInput source="tipo" label="Tipo" choices={tipoChoicesMapping[selectedClasificacion]} />
    ];
    
    // export const PostFilterSidebar = () => (
    //     <Card sx={{ order: -1, mr: 2, mt: 9, width: 500 }}>
    //         <CardContent>
    //             <FilterLiveSearch />
    //             <FilterList label="Category" icon={<CategoryIcon />}>
    //                 <FilterListItem label="ID" value={{ category: 'ID' }} />
    //                 <FilterListItem label="Users" value={{ category: 'users' }} />
    //                 <FilterListItem label="title" value={{ category: 'title' }} />
    //                 <FilterListItem label="Body" value={{ category: 'body' }} />
    //             </FilterList>
    //         </CardContent>
    //     </Card>
    // )
    
    
export const TicketList = () => (
    <List  filters={TicketFilters}> 
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

    const TicketTitle = () => {
        const record = useRecordContext();
        return <span>Post {record ? `"${record.title}"` : ''}</span>;
        };

    export const TicketEdit = () => {
        const notify= useNotify();
        const refresh= useRefresh();
        const redirect= useRedirect();
      
        const onSuccess=()=>{
            notify('Cambios guardados',{undoable:true});
            redirect('/Tickets');
            refresh();
        };

        return(
        <Edit title={<TicketTitle />} mutationOptions={{onSuccess}}>
            <SimpleForm warnWhenUnsavedChanges>        
                <SelectInput source="estatus" label="Estatus" choices={estatusChoices} defaultValue="no iniciado" />
                <TextInput source="comentario"  label="Comentario" multiline rows={5} />
                <TextInput source="folio"  label="Número de Oficio" multiline rows={1} />   
            </SimpleForm>
        </Edit>
        );
    };

   
