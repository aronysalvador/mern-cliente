import clienteAxios from './axios';

//Coloca el token y lo envia via headers
const tokenAuth = token => {
    if(token) {
        clienteAxios.defaults.headers.common['x-auth-token'] = token;


    }else {
        delete clienteAxios.defaults.headers.common['x-auth-token'];
    }
}

export default tokenAuth;