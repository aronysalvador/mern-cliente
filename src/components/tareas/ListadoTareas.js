import React, {Fragment, useContext} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';
import Tarea from './Tarea';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const ListadoTareas = () => {

    //Obtener el state del formulario
    const proyectosContext = useContext(proyectoContext);
    const { proyecto, eliminarProyecto } = proyectosContext;

    //Obtener las tareas del proyecto
    const tareasContext = useContext(tareaContext);
    const { tareasProyecto } = tareasContext;

    //Si no hay proyecto seleccionado
    if(!proyecto) return <h2>Selecciona un Proyecto</h2>;

    //array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;

 

    //Eliminar un Proyecto
    const onClickEliminar = () =>{
        eliminarProyecto(proyectoActual._id);
    }


    return (
        <Fragment>
            <h2>Proyectos: {proyectoActual.nombre}</h2>

            <ul className="listado-tareas">
                {tareasProyecto.length === 0 
                 ? (<li className="tarea"><p>No hay Tareas</p></li>)
                 : 
                 <TransitionGroup>
                    { tareasProyecto.map(tarea =>(
                        <CSSTransition
                            key={tarea.id}
                            timeout={200}
                            classNames="tarea"
                        >
                            <Tarea
                                tarea={tarea}                     
                            />
                        </CSSTransition>
                    ))}
                 </TransitionGroup>
                }
            </ul>

            <button
                type="button"
                className="btn btn-eliminar"
                onClick={onClickEliminar}
            >Eliminar Protecto &times;</button>
        </Fragment>
        
    );
};

export default ListadoTareas;