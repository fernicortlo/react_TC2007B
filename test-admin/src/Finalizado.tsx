import { useNotify, useRecordContext} from "react-admin";
import {
    List,
    Datagrid,
    TextField,
    ReferenceManyField,
    EditButton,
    Create,
    SimpleForm,
    TextInput,
    useRefresh,
    useRedirect,
    Edit,
    SelectInput,
    NumberInput,
    RadioButtonGroupInput,
    TabbedForm,
    useGetRecordId,
    DatagridConfigurable,
    SelectColumnsButton,
    TopToolbar,
    FilterButton,
    CreateButton,
    ExportButton,
    Toolbar,
    SaveButton
} from "react-admin";
import { useState, useEffect} from 'react';
import { ChoiceOption, clasificacionChoices, prioridadChoices, tipoChoicesMapping, estatusChoices } from './choices';
import { getUserId,getUserRol,getUserName } from "./authState";
import InfoIcon from '@mui/icons-material/Info';
import UpdateIcon from '@mui/icons-material/Update';
import { useTheme } from '@mui/material/styles';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import ArchiveIcon from '@mui/icons-material/Archive';


const TicketFilters = [
    //<SearchInput source="q" alwaysOn />,
    <TextInput source="aula" label="Buscar Aula"/>,
    <NumberInput source="id" label="ID" />,
    <SelectInput source="prioridad" label="Prioridad" choices={prioridadChoices} />,
    <SelectInput source="clasificacion" label="Clasificacion" choices={clasificacionChoices} />,
    //<SelectInput source="tipo" label="Tipo" choices={tipoChoicesMapping[selectedClasificacion]} />
];

const TicketListActions = () => (
    <TopToolbar>
        <SelectColumnsButton />
        <FilterButton />
        <ExportButton />
    </TopToolbar>
);


const ThemedIcon = () => {
const theme = useTheme();
return <ArchiveIcon style={{ color: theme.palette.mode === 'dark' ? '#b4d5b1' : '#b53f3f' , fontSize:50}} />;
};

export const TicketTerminadoList = () => (
    <>
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 'px' }}>
         <ThemedIcon />
         <h1 style={{ marginLeft: '10px' }}>Tickets Archivados</h1>
    </div>
    <List filters={TicketFilters} actions={<TicketListActions />}>
        <DatagridConfigurable bulkActionButtons={false}>
         <TextField source="id" />
        <TextField source="aula" />
        <TextField source="autor" />
        <TextField source="clasificacion" />
        <TextField source="tipo" />
        <TextField source="descripcion" />
        <TextField source="estatus" />
        <TextField source="prioridad" />
        <TextField source="fechaCreacion" />
        <TextField source="fechafin" />
        <TextField source="rol" />
        <TextField source="folio" />
        <TextField source="comentario" />
        <EditButton label="Más" icon={<InfoIcon />} />
        </DatagridConfigurable>
    </List>
    </>
        );

        const TicketTitle = () => {
            const record = useRecordContext();
            return <span>Ticket {record ? `"${record.id}"` : ''}</span>;
                };
                
export const TicketFEdit = () => {
    const recordId = useGetRecordId();
    console.log(recordId);
    const notify= useNotify();
    const refresh= useRefresh();
    const redirect= useRedirect();
    const record = useRecordContext();
      
    const onSuccess=()=>{
        notify('Cambios guardados',{undoable:true});
        redirect('/Tickets');
        refresh();
        };


        return(
            <Edit title={<TicketTitle />} mutationOptions={{onSuccess}}>
            <TabbedForm>
                {/* )} */}
            <TabbedForm.Tab label="Historial de versiones"> 
                <ReferenceManyField reference="Historial" target="updateData.id" filter={{ "updateData.id": recordId }}label={false}>
                    <Datagrid bulkActionButtons={false}>
                        <TextField source="id" />
                        <TextField source="updateData.aula" label="Aula" />
                        <TextField source="updateTimestamp" label="Fecha de actualización" />
                        <TextField source="updateData.autor" label="Actualizado por" />
                        <TextField source="updateData.descripscion" label="Avance del ticket" />
                        <TextField source="updateData.estatus" label="Estatus" />
                        <TextField source="updateData.comentario" label="Comentario" />
                    </Datagrid>
                </ReferenceManyField>
            </TabbedForm.Tab>
            </TabbedForm>
        </Edit>
    );
};

    
