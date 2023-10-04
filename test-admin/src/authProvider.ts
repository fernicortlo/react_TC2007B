import { AuthProvider } from "react-admin";

export const authProvider: AuthProvider = {
    // called when the user attempts to log in
    login: async ({ correo, pass }) => {
        console.log('Correo:', correo);
        console.log('Pass:', pass);
        const request = new Request('http://127.0.0.1:1337/login', {
            method: 'POST',
            body: JSON.stringify({ "correo": correo, "pass": pass }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        try {
            const response = await fetch(request);
            if (response.status < 200 || response.status >= 300) {
                throw new Error(response.statusText);
            }
            const auth = await response.json();
            localStorage.setItem('auth', auth.token);
            localStorage.setItem('identity',  JSON.stringify({"id": auth.id,  "fullName":auth.nombreCompleto}));
            return Promise.resolve()
        } catch {
            throw new Error('Error en correo o password');
        }
    },
    // called when the user clicks on the logout button
    logout: () => {
        localStorage.removeItem("username");
        return Promise.resolve();
    },
    // called when the API returns an error
    checkError: ({ status }: { status: number }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem("correo");
            return Promise.reject();
        }
        return Promise.resolve();
    },
    // called when the user navigates to a new location, to check for authentication
    checkAuth: () => {
        return localStorage.getItem("correo")
            ? Promise.resolve()
            : Promise.reject();
    },
    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => Promise.resolve(),
};