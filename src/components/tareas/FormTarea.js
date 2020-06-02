import React, { useContext , useState , useEffect} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

    //Extraer si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    //Obtener la funcion del context de Tarea
    const tareasContext = useContext(tareaContext);
    const { tareaSeleccionada , errorTarea ,agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea } = tareasContext;

    // //Effect que detecta si hay una tarea Seleccionada
    useEffect(() => {
        // 👍 We're not breaking the first rule anymore
        if (tareaSeleccionada !== null) {
          guardarTarea(tareaSeleccionada);
        }else{
            guardarTarea({
                nombre:''
            }) 
        }
      
    }, [tareaSeleccionada]);

    //State del Formulario
    const [tarea,guardarTarea] = useState({
        nombre: ''
    })

    //Extraer el nombre del Proyecto
    const { nombre } = tarea; 

    //Leer los valores del Formulario
    const handleChange = e =>{
        guardarTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    }


    //Si no hay proyecto seleccionado
    if(!proyecto) return null;

    //array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;

    const onSubmit = e => {
        e.preventDefault();

        //Validar
        if(nombre.trim() === ''){
            validarTarea();
            return;
        }

        //Si es Edicion o si es nueva tarea
        if(tareaSeleccionada === null ){
            //Tarea Nueva
             //Agregar la nueva Tarea al State de Tareas
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
        } else {
            //Actualizar Tarea existente 
            actualizarTarea(tarea);

            //Elimina Tarea selecionada del state
            limpiarTarea();
        }

        //Obtener y filtrar las tareas del proyecto actual
        obtenerTareas(proyectoActual.id);


        //Reiniciar el Form
        guardarTarea({
            nombre: ''
        })

    }

    return (
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}

                    />

                </div>

                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaSeleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
                    />

                </div>
            </form>

            {errorTarea ? <p className="mensaje error"> El nombre de la tarea es obligatorio</p> : null}
            
        </div>
    );
};

export default FormTarea;