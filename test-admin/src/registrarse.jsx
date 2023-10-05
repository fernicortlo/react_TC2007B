import React, { useState } from "react";
import { SimpleForm, TextInput, Button, SelectInput, choices, Create, useCreate } from 'react-admin';
import { rolChoices } from "./choices";

const Registrarse = () => {
    const [datos, setDatos] = useState({
        correo: "",
        pass: "",
        nombreCompleto: "",
        rol: "",
        aula: {
            nombreAula: "",
            lugarAula: "",
            sponsorAula: "",
        }
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
    
        if (name.includes('aula.')) {
            const field = name.split('aula.')[1];
            setDatos(prevState => ({
                ...prevState,
                aula: {
                    ...prevState.aula,
                    [field]: value
                }
            }));
        } else {
            setDatos(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };
    
    const isSupervisorAula = datos.rol === 'Supervisor de Aula'
    const handleSendData = async () => {
        const request = await new Request('http://127.0.0.1:1337/registrarse', {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        try {
            const response = await fetch(request);
            if (response.status < 200 || response.status >= 300) {
                throw new Error(response.statusText);
            }

        } catch {
            throw new Error('No se pudo registrar el usuario');
        }
    };

    return (
        <div>
            <h2>Registro de nuevos usuarios</h2>
            
            
            <SimpleForm
            save={handleSendData}>
            <TextInput source="correo" label="Correo" name="correo" onChange={handleChange} required />
            <TextInput source="pass" label="Contraseña" type="password" name="pass" onChange={handleChange} required/>
            <TextInput source="nombreCompleto" label="Nombre Completo" name="nombreCompleto" onChange={handleChange} required/>
            <SelectInput source="rol" label="Rol" name="rol" choices={rolChoices} onChange={handleChange} required/>
            {isSupervisorAula && (
                    <>
                        <TextInput source="aula.nombreAula" label="Nombre de Aula" name="aula.nombreAula" onChange={handleChange} required/>
                        <TextInput source="aula.lugarAula" label="Lugar de Aula" name="aula.lugarAula" onChange={handleChange} required/>
                        <TextInput source="aula.sponsorAula" label="Patrocinador de Aula" name="aula.sponsorAula" onChange={handleChange} required />
                    </>
                )}
            
            <Button label="Crear Usuario" onClick={handleSendData} />
            </SimpleForm>
            
        </div>
    );
};

export default Registrarse;


// import { useNotify, useRecordContext} from "react-admin";
// import { Card, CardContent } from '@mui/material';
// import CategoryIcon from '@mui/icons-material/LocalOffer';
// import {
//     List,
//     Datagrid,
//     TextField,
//     // ReferenceField,
//     EditButton,
//     // Edit,
//     Create,
//     SimpleForm,
//     ReferenceInput,
//     TextInput,
//     useRefresh,
//     useRedirect,
//     // FilterList,
//     // FilterListItem,
//     // FilterLiveSearch,
//     // Button,
//     // useCreate,
//     SelectInput
// } from "react-admin";
// import React, { useState, ChangeEvent } from 'react';
// import { choices, useCreate } from 'react-admin';
// import { rolChoices } from "./choices";

// const registrarse = () => {
//     const notify= useNotify();
//     const refresh = useRefresh();
//     const redirect = useRedirect();
    

    // const [tipoChoices, setTipoChoices] = useState<ChoiceOption[]>([]);

    // const handleClasificacionChange = (event: React.ChangeEvent<{ name?: string; value: any }>) => {
    //     const selectedClasificacion = event.target.value as string;
    //     setTipoChoices(tipoChoicesMapping[selectedClasificacion] || []);
    // };
    
//     const onSuccess = () => {
//         notify('Usuario Creado', {undoable: true});
//         redirect('/login');
//         refresh();
//     };

//     return (
//         <Create mutationOptions={{ onSuccess }}>
//             <SimpleForm>
//             <TextInput source="correo" label="Correo" name="correo" onChange={handleChange} required />
//              <TextInput source="pass" label="Contraseña" type="password" name="pass" onChange={handleChange} required/>
//              <TextInput source="nombreCompleto" label="Nombre Completo" name="nombreCompleto" onChange={handleChange} required/>
//              <SelectInput source="rol" label="Rol" name="rol" choices={rolChoices} onChange={handleChange} required/>
//              <TextInput source="nombreAula" label="Nombre de Aula" name="aula.nombreAula" onChange={handleChange} required/>
//              <TextInput source="lugarAula" label="Lugar de Aula" name="aula.lugarAula" onChange={handleChange} required/>
//              <TextInput source="sponsorAula" label="Patrocinador de Aula" name="aula.sponsorAula" onChange={handleChange} required />
//             </SimpleForm>
//         </Create>
//     );
// };
// export default registrarse;