
import {
    List,
    Datagrid,
    TextField,
    EditButton,
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