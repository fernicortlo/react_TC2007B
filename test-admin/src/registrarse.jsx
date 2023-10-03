import React, {useState} from "react";

const Registrarse = () =>{

    const [datos, setDatos]=useState({
        correo: "",
        pass: "",
        nombreCompleto: "",
        rol:"",
        aula: {
            nombreAula: "",
            lugarAula: "",
            sponsorAula: "",
        }
    });

    const handleChange= (event)=>{
        setDatos({
            ...datos,
            [event.target.name]: event.target.value,
        });
    };

    const handleSendData = async() => {
        // Convert the form data to JSON
        const request = await new Request('http://127.0.0.1:1337/registrarse', {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: new Headers({ 'Content-Type': 'application/json'}),
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
            <form>
                <div>
                    <label htmlFor="correo">Correo: </label>
                    <input 
                        type="text"
                        id="correo"
                        name="correo"
                        value={datos.correo}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="contraseña">Contraseña: </label>
                    <input 
                        type="password"
                        id="pass"
                        name="pass"
                        value={datos.pass}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="Nombre Completo">Nombre Completo: </label>
                    <input 
                        type="text"
                        id="nombreCompleto"
                        name="nombreCompleto"
                        value={datos.nombreCompleto}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="rol">Rol: </label>
                    <input 
                        type="text"
                        id="rol"
                        name="rol"
                        value={datos.rol}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="Lugar de aula">Lugar de Aula: </label>
                    <input 
                        type="text"
                        id="lugarAula"
                        name="lugarAula"
                        value={datos.aula.lugarAula}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="Patrocinador de aula">Patrocinador de Aula: </label>
                    <input 
                        type="text"
                        id="patrocinadorAula"
                        name="patrocinadorAula"
                        value={datos.aula.patrocinadorAula}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="Nombre de aula">Nombre de Aula: </label>
                    <input 
                        type="text"
                        id="nombreAula"
                        name="nombreAula"
                        value={datos.nombreAula}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <button type="button" onClick={handleSendData}>
                        Crear Usuario
                    </button>
                </div>
            </form>
        </div>
    );

};

export default Registrarse;