import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { useNotify, useRecordContext} from "react-admin";
import {
    List,
    Datagrid,
    TextField,
    EditButton,
    useGetRecordId,
    // Edit,
} from "react-admin";
export const HistorialList = () => {
    console.log("idT");
    return(
     <List resource="Historial">
        <Datagrid>
             <TextField source="updateData.autor" />
             <TextField source="id" />
             <TextField source="updateData.estatus" />
             <TextField source="updateData.comentario" />
             <EditButton />
        </Datagrid>
        </List>
    )
};