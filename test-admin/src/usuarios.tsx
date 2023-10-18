import {useRecordContext} from "react-admin";
import {
    List,
    TextField,
} from "react-admin";
let rol = localStorage.getItem('rol');
const isSupervisorAula = rol === 'Supervisor de Aula'

export const usuarioList = () => {
    if(localStorage.getItem('rol') === 'Administrador'){
        return(
    <List>
        <TextField source="correo"/>
        <TextField source="pass"/>
        <TextField  source="nombreCompleto"/>
        <TextField  source="rol"/>
            {isSupervisorAula && (
                    <>
                        <TextField source="aula.nombreAula" label="Nombre de Aula" name="aula.nombreAula" onChange={handleChange} required={true}/>
                        <TextField  source="aula.lugarAula" label="Lugar de Aula" name="aula.lugarAula" onChange={handleChange} required={true}/>
                        <TextField  source="aula.sponsorAula" label="Patrocinador de Aula" name="aula.sponsorAula" onChange={handleChange} required={true} />
                    </>
                )}
    </List>
);}
else {
    return(
        <div>
            <h2>No tienes permisos para acceder a esta página</h2>
        </div>
    );
    }
};