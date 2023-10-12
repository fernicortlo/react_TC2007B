import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { useNotify, useRecordContext} from "react-admin";
import {
    List,
    Datagrid,
    TextField,
    EditButton,
    // Edit,
} from "react-admin";
export const HistorialList = () => {
    const { idT} = useParams();
    console.log("idT");
    return(
     <List resource="Historial" filter={{ id: idT }}>
        <Datagrid>
             <TextField source="updatedBy" />
             <TextField source="id" />
             <TextField source="updateData.estatus" />
             <EditButton />
        </Datagrid>
        </List>
    )
};