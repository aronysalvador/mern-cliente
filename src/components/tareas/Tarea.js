import React, {useContext} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const Tarea = ({tarea}) => {

    //Extraer si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    //Obtener la funcion del context de Tarea
    const tareasContext = useContext(tareaContext);
    const { eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual } = tareasContext;

    //Extraer el proyecto
    const [proyectoActual] = proyecto

    //Funcion que se ejecuta cuando el usuario presiona eliminar tarea
    const tareaEliminar = id =>{
        eliminarTarea(id , proyectoActual._id);
        obtenerTareas(proyectoActual.id);
    }

    //Funcion que modifica el estado de la tarea
    const cambiarEstado = tarea=>{
        if(tarea.estado){
            tarea.estado=false;
        }else{
            tarea.estado=true;
        }
        actualizarTarea(tarea);
    }

    //Agrega una Tarea Actual cuando el usuario desea editarla
    const seleccionarTarea = tarea =>{
        guardarTareaActual(tarea);
    }



    return (
        <li className="tarea sombra">
            {tarea.nombre}

            <div className="estado">
                {tarea.estado
                ?
                    (
                        <button
                            type="button"
                            className="completo"
                            onClick={() => cambiarEstado(tarea)}
                        >Completo</button>
                    )

                :   
                    (
                        <button
                            type="button"
                            className="incompleto"
                            onClick={() => cambiarEstado(tarea)}
                        >Incompleto</button>
                    )

                }

            </div>

            <div className="acciones">

                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => seleccionarTarea(tarea)}
                >Editar</button>

                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => tareaEliminar(tarea._id)}
                >Eliminar</button>
            </div>
        </li>
    );
};

export default Tarea;