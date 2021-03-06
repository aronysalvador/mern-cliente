import React, {useContext} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const Proyecto = ({proyecto}) => {

    //Obtener el state de Proyectos
    const proyectosContext = useContext(proyectoContext);
    const { proyectoActual } = proyectosContext;

    //Obtener la funcion del context de Tarea
    const tareasContext = useContext(tareaContext);
    const { obtenerTareas } = tareasContext;

    //Funcion para agregar el Proyecto Actual
    const seleccionarProyecto = id => {
        proyectoActual(id);//Fijar un proyecto Actual
        obtenerTareas(id);//Filtrar las tareas cuando se le da un id
    }

    return (
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => seleccionarProyecto(proyecto._id)}
            >{proyecto.nombre}</button>
        </li>
    );
};

export default Proyecto;