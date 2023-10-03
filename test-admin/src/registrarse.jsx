import React, { useState } from "react";
import { SimpleForm, TextInput, Button, SelectInput, choices } from 'react-admin';
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
            <SimpleForm>
            <TextInput source="correo" label="Correo" name="correo" onChange={handleChange} />
            <TextInput source="pass" label="Contraseña" type="password" name="pass" onChange={handleChange} />
            <TextInput source="nombreCompleto" label="Nombre Completo" name="nombreCompleto" onChange={handleChange} />
            <SelectInput source="rol" label="Rol" name="rol" choices={rolChoices} onChange={handleChange} />
            <TextInput source="nombreAula" label="Nombre de Aula" name="aula.nombreAula" onChange={handleChange} />
            <TextInput source="lugarAula" label="Lugar de Aula" name="aula.lugarAula" onChange={handleChange} />
            <TextInput source="sponsorAula" label="Patrocinador de Aula" name="aula.sponsorAula" onChange={handleChange} />
            <Button label="Crear Usuario" onClick={handleSendData} />
            </SimpleForm>
        </div>
    );
};

export default Registrarse;
