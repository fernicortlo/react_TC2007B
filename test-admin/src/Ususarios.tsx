import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { DeleteButton, useNotify, useRecordContext} from "react-admin";
import {
    List,
    Datagrid,
    TextField,
    EditButton,
    useGetRecordId,
    // Edit,
} from "react-admin";

export const UsuarioslList = () => {
    return(
     <List resource="Usuarios">
        <Datagrid bulkActionButtons={false}>
             <TextField source="correo" />
             <TextField source="nombreCompleto" />
             <TextField source="rol" />
             <TextField source="aula.nombreAula" />
             <DeleteButton />
        </Datagrid>
        </List>
    )
};