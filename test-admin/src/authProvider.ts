import { AuthProvider } from "react-admin";
import { setUserId,setUserRol,setUserName, setToken } from "./authState";

export const authProvider: AuthProvider = {
    // called when the user attempts to log in
    login: async ({ correo, pass }) => {
        // console.log('Correo:', correo);
        // console.log('Pass:', pass);
        const request = new Request('https://127.0.0.1:1337/login', {
            method: 'POST',
            body: JSON.stringify({ "correo": correo, "pass": pass }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        try {
            const response = await fetch(request);
            //console.log(response.status);
            if (response.status < 200 || response.status >= 300) {
                throw new Error(response.statusText);
            }
            const auth = await response.json();
            localStorage.setItem('auth', auth.token);
            setToken(auth.token)
            // console.log('auth', auth);
            localStorage.setItem('identity',  JSON.stringify({"id": auth.id,  "fullName":auth.nombreCompleto, "rol":auth.rol,"aula":auth.aula}));
            localStorage.setItem('rol', auth.rol);
            localStorage.setItem('aula', auth.aula);
            localStorage.setItem('nombreCompleto', auth.nombreCompleto);
            setUserId(auth.aula)
            setUserName(auth.nombreCompleto)
            // console.log("token",auth.token)
            return Promise.resolve()
        } catch {
            throw new Error('Error en correo o password');
        }
    },

logout: ()=>{
    localStorage.removeItem("auth");
    localStorage.removeItem("identity");
    return Promise.resolve();
},
checkAuth: ()=>{
    return localStorage.getItem("auth")? Promise.resolve(): Promise.reject();
},
checkError: (error) =>{
    const status=error.status;
    if(status===401|| status===403){
        localStorage.removeItem("auth");
        localStorage.removeItem("identity");
        return Promise.reject();
    }
    return Promise.resolve();
},
getIdentity: ()=>{
    try{
        return Promise.resolve(JSON.parse(localStorage.getItem("identity")));
    }catch{
        return Promise.reject()
    }
},
getPermissions: ()=>{return Promise.resolve([])},

};

export default authProvider;
