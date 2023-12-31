import React, { useState, useCallback } from "react";
import { SimpleForm, TextInput, Button, SelectInput,useRedirect, useNotify, useUnique, useRefresh} from 'react-admin';
import { rolChoices } from "./choices";
import SaveIcon from '@mui/icons-material/Save';


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
    const redirect = useRedirect();
    const notify=useNotify();
    const refresh= useRefresh();
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
    // const useUnique = () => {   
    //     const emailUnique = useCallback(async(correo) => {
    //         try{
    //             const response=await fetch ()
    //         }
  
    
    const isSupervisorAula = datos.rol === 'Supervisor de Aula'

    const handleSendData = async () => {
        const request = await new Request('https://127.0.0.1:1337/registrarse', {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        try {
            const response = await fetch(request);
            refresh()
            redirect('/registrarse');
            notify('Usuario creado con éxito')
            
            if (response.status < 200 || response.status >= 300) {
                throw new Error(response.statusText);
            }

        } catch {
            throw new Error('No se pudo registrar el usuario');
        }
    };
    if(localStorage.getItem("rol")==="Administrador"){
    return (
        <div>
            <h2>Registro de nuevos usuarios</h2>
            
            
            <SimpleForm
            save={handleSendData}
            toolbar={null}>
            <TextInput source="correo" label="Correo" name="correo" onChange={handleChange} required={true} validate={useUnique()}/>
            <TextInput source="pass" label="Contraseña" type="password" name="pass" onChange={handleChange} required={true}/>
            <TextInput source="nombreCompleto" label="Nombre Completo" name="nombreCompleto" onChange={handleChange} required={true}/>
            <SelectInput source="rol" label="Rol" name="rol" choices={rolChoices} onChange={handleChange} required={true}/>
            {isSupervisorAula && (
                    <>
                        <TextInput source="aula.nombreAula" label="Nombre de Aula" name="aula.nombreAula" onChange={handleChange} required={true}/>
                        <TextInput source="aula.lugarAula" label="Lugar de Aula" name="aula.lugarAula" onChange={handleChange} required={true}/>
                        <TextInput source="aula.sponsorAula" label="Patrocinador de Aula" name="aula.sponsorAula" onChange={handleChange} required={true} />
                    </>
                )}
            
            <Button label="Crear Usuario" 
            onClick={handleSendData} 
            variant="contained"
            color="success"
            endIcon={<SaveIcon />}/>
            </SimpleForm>
            
        </div>
    );}
    else{
        return(
            <div>
                <h2>No tienes permisos para acceder a esta página</h2>
            </div>
        );
    }
};

export default Registrarse;

