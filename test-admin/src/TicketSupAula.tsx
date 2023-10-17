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
    SaveButton,
    Button
} from "react-admin";
import { useState, useEffect} from 'react';
import { ChoiceOption, clasificacionChoices, prioridadChoices, tipoChoicesMapping, estatusChoices } from './choices';
import { getUserId,getUserRol,getUserName } from "./authState";
import InfoIcon from '@mui/icons-material/Info';
import UpdateIcon from '@mui/icons-material/Update';
import { useTheme } from '@mui/material/styles';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import ArchiveIcon from '@mui/icons-material/Archive';
import { redirect } from "react-router-dom";

export const TicketCreate = () => {
    const notify= useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();
    

    const [tipoChoices, setTipoChoices] = useState<ChoiceOption[]>([]);

    const handleClasificacionChange = (event) => {
        const selectedClasificacion = event.target.value;
        const newTipoChoices = tipoChoicesMapping[selectedClasificacion] || [];
        setTipoChoices(newTipoChoices);
    };
    const onSuccess = () => {
        notify('Ticket Creado', {undoable: true});
        redirect('/Tickets');
        refresh();
    };
    
    let rol = localStorage.getItem('rol');
    if(rol === 'Supervisor de Aula'){
    return (
        <Create mutationOptions={{ onSuccess }}>
            <SimpleForm>
                <TextInput source="rol" label="Rol" defaultValue={getUserRol()} disabled/>
                <TextInput source="aula" label="Aula" defaultValue={getUserId()} disabled/>
                <TextInput source="autor" label="Autor" defaultValue={getUserName()} disabled/>
                <SelectInput source="clasificacion" label="Clasificación" choices={clasificacionChoices} onChange={handleClasificacionChange} required={true}/>
                <SelectInput source="tipo" label="Tipo" choices={tipoChoices} required={true}/>
                {/* <RadioButtonGroupInput source="tipo" label="Tipo" choices={tipoChoices} required={true}/> */}
                <RadioButtonGroupInput source="prioridad" label="Prioridad" choices={prioridadChoices} required={true}/>
                <SelectInput source="estatus" label="Estatus" choices={estatusChoices} defaultValue="Creado" disabled />
                <TextInput source="descripcion"  label="Descripción del ticket" multiline rows={5} required={true}/>
                <TextInput source="folio"  label="Número de Oficio" multiline rows={1}/>
                <TextInput source="comentario"  label="Comentario" multiline rows={5}/>
                
            </SimpleForm>
        </Create>
    );
    }
    else if(rol === 'Supervisor Nacional' || rol=== 'Supervisor Ejecutivo'){
        return (
            <Create mutationOptions={{ onSuccess }}>
                <SimpleForm>
                    <TextInput source="rol" label="Rol" defaultValue={getUserRol()} disabled/>
                    <TextInput source="autor" label="Autor" defaultValue={getUserName()} disabled/>
                    <TextInput source="aula" label="Aula" required={true}/>
                    <SelectInput source="clasificacion" label="Clasificación" choices={clasificacionChoices} onChange={handleClasificacionChange} required={true}/>
                    <SelectInput source="tipo" label="Tipo" choices={tipoChoices} required={true}/>
                    <RadioButtonGroupInput source="prioridad" label="Prioridad" choices={prioridadChoices} required={true}/>
                    <RadioButtonGroupInput source="estatus" label="Estatus" choices={estatusChoices} defaultValue="Creado" disabled/>
                    <TextInput source="descripción"  label="Descripción del ticket" multiline rows={5} required={true}/>
                    <TextInput source="folio"  label="Número de Oficio" multiline rows={1}/>
                    <TextInput source="comentario"  label="Comentario" multiline rows={5} />
                    
                </SimpleForm>
            </Create>
        );
    }
};

const TicketFilters = [
        //<SearchInput source="q" alwaysOn />,
        <TextInput source="aula" label="Buscar Aula"/>,
        <NumberInput source="id" label="ID" />, //Id no funciona.
        <SelectInput source="estatus" label="Estatus" choices={estatusChoices} />,
        <SelectInput source="prioridad" label="Prioridad" choices={prioridadChoices} />,
        <SelectInput source="clasificacion" label="Clasificacion" choices={clasificacionChoices} />,
        //<SelectInput source="tipo" label="Tipo" choices={tipoChoicesMapping[selectedClasificacion]} />
    ];
    
    const TicketListActions = () => (
        <TopToolbar>
            <SelectColumnsButton />
            <FilterButton />
            <CreateButton />
            <ExportButton />
        </TopToolbar>
    );


const ThemedIcon = () => {
    const theme = useTheme();
    return <SpeakerNotesIcon style={{ color: theme.palette.mode === 'dark' ? '#b4d5b1' : '#b53f3f', fontSize:50}} />;
  };
  
  function RedirectToFinalizadoButton() {
    const redirect = useRedirect();
  
    const handleRedirectToFinalizado = () => {
      redirect('/Finalizado');
    };
    const theme = useTheme();
    return (
      <Button label="Tickets finalizados" onClick={handleRedirectToFinalizado}  variant='contained' startIcon={< ArchiveIcon style={{fontSize:30}}/>} 
      sx={{
        height:'50px', fontsize:'16px', color:'White',background: theme.palette.mode === 'dark' ? '#b53f3f': 'green',}}/>
    );
  }
export const TicketList = () => {
    if(localStorage.getItem('rol') === 'Supervisor de Aula' || localStorage.getItem('rol') === 'Supervisor Nacional' || localStorage.getItem('rol') === 'Supervisor Ejecutivo'){
    return(
    <>
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 'px' }}>
      <ThemedIcon />
      <h1 style={{ marginLeft: '10px', fontSize:'49px' }}>Tickets</h1>
    </div>
    <div style={{position:'absolute',top:130, right:30}}>
    <RedirectToFinalizadoButton />
    </div>
    <List filters={TicketFilters} actions={<TicketListActions/>}>
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
        <TextField source="rol" />
        <TextField source="folio" />
        <TextField source="comentario" />
        <EditButton label="Más" icon={<InfoIcon />} />
      </DatagridConfigurable>
    </List>
  </>
    );}
    else {
            return(
                <div>
                    <h2>No tienes permisos para acceder a esta página</h2>
                </div>
            );
    }
};

    

const TicketTitle = () => {
    const record = useRecordContext();
    return <span>Ticket {record ? `"${record.id}"` : ''}</span>;
        };



export const TicketEdit = () => {
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
            <TabbedForm toolbar={null}> 
                {/* {record && record.updateData.estatus !== 'Terminado' && (  */}
                <TabbedForm.Tab label="Actualizar Ticket"> 
                <TextInput source="autor" label="Autor" defaultValue={getUserName()} disabled/>
                <RadioButtonGroupInput source="estatus" label="Estatus" choices={estatusChoices} />
                <TextInput source="descripcion"  label="Avance del ticket" multiline rows={5} />
                <TextInput source="comentario"  label="Comentario" multiline rows={5} />
                {/* <TextInput source="folio"  label="Número de Oficio" multiline rows={1} />   */}
                <Toolbar>
                <SaveButton label="Actualizar" icon={<UpdateIcon/>}/>
                 </Toolbar>
            </TabbedForm.Tab>
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

    
