import React, {useState, useEffect} from "react";
import { Form, Button, Alert } from "react-bootstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { checkUser, cantidadCaracteres } from "../../helpers";

const CrearReceta = () => {
    //inicializar useNavigate
    const navigate = useNavigate();

    useEffect(()=>{
        const usuario = checkUser();
        if (usuario===null || usuario.valido===false || usuario.perfil!=='admin') 
            navigate('/login');
    }, []);

    const API_URL = process.env.REACT_APP_API_URL;

    const [form, setForm] = useState({});
    const [errors, setErrors ] = useState({});
    const [mensajeError, setMensajeError] = useState('');

    const setField = (field, value) => {
        setForm({
          ...form,
          [field]: value
        });
        // Check and see if errors exist, and remove them from the error object:
        if ( !!errors[field] ) setErrors({
            ...errors,
            [field]: null
        });
    }

    const findFormErrors = () => {
        const { nombre, imagen, ingredientes, instrucciones } = form;
        const newErrors = {}
        // nombre errors
        if ( !nombre || nombre === '' ) newErrors.nombre = 'Ingrese un nombre'
        else if (!cantidadCaracteres(nombre, 2, 30))  newErrors.nombre = 'El nombre debe tener entre 2 y 30 caracteres'

        // imagen errors
        if ( !imagen || imagen === '' ) newErrors.imagen = 'Ingrese url de imagen'
        else if (!cantidadCaracteres(imagen, 1, 100))  newErrors.imagen = 'La imagen debe tener entre 1 y 100 caracteres'
        //else if (!validarUrl(imagen)) newErrors.imagen = 'Ingrese una URL válida'
    
        // ingredientes errors
        if ( !ingredientes || ingredientes === '' ) newErrors.ingredientes = 'Ingrese los ingredientes'
        else if (!cantidadCaracteres(ingredientes, 1, 200))  newErrors.ingredientes = 'Los ingredientes deben tener entre 1 y 200 caracteres'

        // instrucciones errors
        if ( !instrucciones || instrucciones === '' ) newErrors.instrucciones = 'Ingrese las instrucciones'
        else if (!cantidadCaracteres(instrucciones, 1, 200))  newErrors.instrucciones = 'Las instrucciones deben tener entre 1 y 200 caracteres'

        return newErrors
    }


    const handleSubmit = async(e)=>{
        e.preventDefault();

        //validar
        const newErrors = findFormErrors();
        if ( Object.keys(newErrors).length > 0 ) {
            // We got errors!
            setErrors(newErrors);
            return;
        }

        //crear el objeto
        const receta = form;
        setMensajeError('');

        try {
            const respuesta = await fetch(API_URL, {
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify(receta)
            });

            if (respuesta.status === 201)
            {
                Swal.fire(
                    'Receta creada',
                    'La receta fue agregada correctamente',
                    'success'
                );

                //redirecciono a administracion
                navigate('/receta/administrar');
            }
        } 
        catch(error) {
            Swal.fire(
                'Error creando la receta',
                'No se pudo crear la receta, intente nuevamente en unos minutos',
                'error'
            );
        }    
    }

    return (
        <section className="container">
            <h1 className="display-4 mt-5">Ingresar Receta</h1>
            <hr />
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formNombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="Ej: Empanadas de carne" onChange={(e) => setField('nombre',e.target.value)} isInvalid={ !!errors.nombre }/>
                    <Form.Control.Feedback type='invalid'>{ errors.nombre }</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formImagen">
                    <Form.Label>Imagen</Form.Label>
                    <Form.Control type="text" placeholder="Pegar la dirección de una imágen" onChange={(e) => setField('imagen',e.target.value)} isInvalid={ !!errors.imagen }/>
                    <Form.Control.Feedback type='invalid'>{ errors.imagen }</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formIngredientes">
                    <Form.Label>Ingredientes</Form.Label>
                    <Form.Control as="textarea" rows={4} placeholder="Ej: 
                    -200g de harina, 
                    -1/2kg de carne, 
                    -..." onChange={(e) => setField('ingredientes',e.target.value)} isInvalid={ !!errors.ingredientes }/>
                    <Form.Control.Feedback type='invalid'>{ errors.ingredientes }</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formInstrucciones">
                    <Form.Label>Instrucciones</Form.Label>
                    <Form.Control as="textarea" rows={4} placeholder="Ej:
                        1-preparar la masa
                        2-cortar la carne a cuchillo
                        3-..." onChange={(e) => setField('instrucciones',e.target.value)} isInvalid={ !!errors.instrucciones }/>
                        <Form.Control.Feedback type='invalid'>{ errors.instrucciones }</Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit" className="me-1">
                    Guardar
                </Button>
                <Button className="btn btn-primary" onClick={()=>{navigate(-1);}}>
                    Cancelar
                </Button>
            </Form>
            {mensajeError === true ? <Alert variant="danger">Debe corregir los datos</Alert> : null}
        </section>
    );
};

export default CrearReceta;
