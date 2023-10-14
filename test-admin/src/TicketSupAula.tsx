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
} from "react-admin";
import { useState, useEffect} from 'react';
import { ChoiceOption, clasificacionChoices, prioridadChoices, tipoChoicesMapping, estatusChoices } from './choices';
import { getUserId,getUserRol,getUserName } from "./authState";
import InfoIcon from '@mui/icons-material/Info';

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
    
    let rol = getUserRol();
    if(rol === 'Supervisor de Aula'){
    return (
        <Create mutationOptions={{ onSuccess }}>
            <SimpleForm>
                <TextInput source="rol" label="Rol" defaultValue={getUserRol()} disabled/>
                <TextInput source="aula" label="Aula" defaultValue={getUserId()} disabled/>
                <TextInput source="autor" label="Autor" defaultValue={getUserName()} disabled/>
                <SelectInput source="clasificacion" label="Clasificación" choices={clasificacionChoices} onChange={handleClasificacionChange} required={true}/>
                <SelectInput source="tipo" label="Tipo" choices={tipoChoices} required={true}/>
                <RadioButtonGroupInput source="tipo" label="Tipo" choices={tipoChoices} required={true}/>
                <RadioButtonGroupInput source="prioridad" label="Prioridad" choices={prioridadChoices} required={true}/>
                <SelectInput source="estatus" label="Estatus" choices={estatusChoices} defaultValue="Creado" disabled />
                <TextInput source="descripscion"  label="Descripsión del ticket" multiline rows={5} required={true}/>
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
                    <TextInput source="descripscion"  label="Descripsión del ticket" multiline rows={5} required={true}/>
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
    const TicketListActions = () => (
        <TopToolbar>
            <SelectColumnsButton />
            <FilterButton />
            <CreateButton />
            <ExportButton />
        </TopToolbar>
    );

export const TicketList = () => (
        <List filters={TicketFilters} actions={<TicketListActions />}> 
          <DatagridConfigurable bulkActionButtons={false}>
                <TextField source="id" />
                <TextField source="aula" />
                <TextField source="autor" />
                <TextField source="clasificacion" />
                <TextField source="tipo" />
                <TextField source="descripscion" />
                <TextField source="estatus" />
                <TextField source="prioridad" />
                <TextField source="fechaCreacion" /> 
                <TextField source="rol" />
                <TextField source="folio" />
                <TextField source="comentario" />
                <EditButton label="Mas" icon={<InfoIcon/>}/>
            </DatagridConfigurable>
        </List>
    );
    

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
        
      
    const onSuccess=()=>{
        notify('Cambios guardados',{undoable:true});
        redirect('/Tickets');
        refresh();
        };

        return(
            <Edit title={<TicketTitle />} mutationOptions={{onSuccess}}>
            <TabbedForm> 
                
                <TabbedForm.Tab label="Actualizar Ticket"> 
                <RadioButtonGroupInput source="estatus" label="Estatus" choices={estatusChoices} />
                <TextInput source="descripscion"  label="Avance del ticket" multiline rows={5} />
                <TextInput source="comentario"  label="Comentario" multiline rows={5} />
                {/* <TextInput source="folio"  label="Número de Oficio" multiline rows={1} />   */}
            </TabbedForm.Tab>
            <TabbedForm.Tab label="Historial de versiones"> 
                <ReferenceManyField reference="Historial" target="updateData.id" filter={{ "updateData.id": recordId }}label={false}>
                    <Datagrid bulkActionButtons={false}>
                        <TextField source="id" />
                        <TextField source="updateData.aula" label="Aula" />
                        <TextField source="updateData.fechaCreacion" label="Fecha de creación" />
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

    
