import React, {useState, useContext , useEffect} from 'react';
import {Link} from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const NuevaCuenta = (props) => {

    //Extraer los valores del context
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, registrarUsuario } = authContext;

    //En caso de que el usuario se haya autenticado o registrado o sea un registro duplicado
    useEffect(() => {
        if(autenticado) {
            props.history.push('/proyectos')
        }

        if(mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

        // eslint-disable-next-line
    }, [mensaje , autenticado, props.history]);


    //State para inciar Sesión
    const [usuario,guardarUsuario] = useState({
        nombre:'',
        email:'',
        password:'',
        confirmar:''
    });

    //Extraer usuario
    const {nombre, email, password, confirmar} = usuario;


    const onChange =  e =>{
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value


        })
    }

    //Cuando el usuario quiere iniciar Sesión
    const onSubmit = e =>{
        e.preventDefault();

        //Validar que no haya campos vacios
        if(nombre.trim() === '' || 
            email.trim() === '' ||
            password.trim() === '' ||
             confirmar.trim() === '' ) {
                mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
        }

        //Password minimo 6 caracteres
        if(password.length < 6) {
            mostrarAlerta('El password debe ser de al menos 6 caracteres', 'alerta-error');
            return;
        }

        //Los 2 password son iguales
        if(password !== confirmar) {
            mostrarAlerta('Los password no son iguales', 'alerta-error');
            return;
        }

        //Pasarlo al Action
        registrarUsuario({
            nombre,
            email,
            password
        });

    }

    return (
        
        <div className="form-usuario">
            {alerta ? ( <div className={`alerta ${alerta.categoria}`}><h5>{alerta.msg}</h5></div>) : null}
            <div className="contenedor-form sombra-dark">         
                <h1>Obtener Cuenta</h1>

                <form
                    onSubmit={onSubmit}
                >

                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input  
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Tu nombre"
                            value={nombre}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input  
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu Email"
                            value={email}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input  
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu password"
                            value={password}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="confirma">Confirmar Password</label>
                        <input  
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            placeholder="Repite tu password"
                            value={confirmar}
                            onChange={onChange}
                        />
                    </div>

                    

                    <div className="campo-form">
                        <input
                            type="submit"
                            className="btn btn-primario btn-block "
                            value="Registrarme"
                        />
                    </div>

                    <Link
                        to={'/'}
                        className="enlace-cuenta"
                    >
                        Volver a Iniciar Sesión
                    </Link>
                </form>
            </div>

        </div>
    );
};

export default NuevaCuenta;