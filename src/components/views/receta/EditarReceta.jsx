import {useEffect, useState, useRef} from 'react';
import {Form, Button} from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
//import { cantidadCaracteres, validarUrl } from "./helpers";
import Swal from 'sweetalert2'

const EditarReceta = () => {
    //recuperar datos de la receta
    const {id} = useParams();

    //variable de entorno
    const URL_API = process.env.REACT_APP_API_URL;
    
    const [receta, setReceta]=useState({});
    //referencias
    const nombreRef = useRef("");
    const imagenRef = useRef("");
    const ingredientesRef = useRef("");
    const instruccionesRef = useRef("");

    const navegacion = useNavigate();

    useEffect(()=>{
        consultarAPI();
    },[])

    const consultarAPI = async()=>{
        try 
        {
            const respuesta = await fetch(URL_API+`/${id}`);
            const dato = await respuesta.json();
            setReceta(dato);
        }
        catch(error)
        {
            console.log(error);
        }
    };

    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        //aplicar las validaciones aquí
        // if (cantidadCaracteres(nombreRef.current.value, 2, 50) && validarPrecio(ingredientesRef.current.value) && validarUrl(imagenRef.current.value) /*categoria */) {
        // ifinstruccionesres(nombreRef.current.value, 2, 50) && validarPrecio(ingredientesRef.current.value) && validarUrl(imagenRef.current.value) /*categoria */) {
        //     console.log("validacion ok");
        // }
        // else
        // {
        //     console.log("error validacion");
        // }

        //creo el objeto
        const recetaEditar = {
            _id: id,
            nombre: nombreRef.current.value,
            imagen: imagenRef.current.value,
            ingredientes: ingredientesRef.current.value,
            instrucciones: instruccionesRef.current.value,
        }

        //pedir a la api la actualizacion
        try
        {
            const respuesta = await fetch(URL_API+`/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(recetaEditar)
            });
            if (respuesta.status === 200)
            {
                Swal.fire(
                    'Receta modificado',
                    'El receta fue modificado correctamente',
                    'success'
                );

                //redirecciono a la tabla de recetas
                navegacion('/administrar');
            }
        }
        catch(error)
        {
            console.log(error);
        }
    }

    return (
        <section className="container">
            <h1 className="display-4 mt-5">Editar Receta</h1>
            <hr />
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formNombreReceta">
                    <Form.Label>Nombre Receta</Form.Label>
                    <Form.Control type="text" defaultValue={receta.nombre} ref={nombreRef}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formImagen">
                    <Form.Label>Imagen</Form.Label>
                    <Form.Control type="text" defaultValue={receta.imagen} ref={imagenRef}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formIngredientes">
                    <Form.Label>Ingredientes</Form.Label>
                    <Form.Control as="textarea" rows={4} defaultValue={receta.ingredientes} ref={ingredientesRef}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formInstrucciones">
                    <Form.Label>Instrucciones</Form.Label>
                    <Form.Control as="textarea" rows={4} defaultValue={receta.instrucciones} ref={instruccionesRef}/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Guardar
                </Button>
                <Link to="/receta/administrar" className="ms-3 btn btn-danger">
                    Cancelar
                </Link>

            </Form>
        </section>
    );
};

export default EditarReceta;