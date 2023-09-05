import { useMediaQuery, Theme } from "@mui/material";
import { List, SimpleList, Datagrid, TextField, EmailField } from "react-admin";
import MyUrlField from './MyUrlField';

export const UserList = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    return (
        <List>
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.name}
                    secondaryText={(record) => record.username}
                    tertiaryText={(record) => record.email}
                />
            ) : (
                <Datagrid rowClick="show">
    <TextField source="id"  />
    <TextField source="Name" label="Nombre" />
-   <TextField source="username" label="Usuario" />
    <EmailField source="email" label="Email" />
-   <TextField source="address.street" label="Dirección de calle" />
    <TextField source="phone" label="Telefono" />
    <MyUrlField source="website" label="Sitio WEB" />
    <TextField source="company.name" label="Nombre de la compañía" />
  </Datagrid>
            )}
        </List>
    );
};