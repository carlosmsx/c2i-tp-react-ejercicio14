import React, {useState, useEffect} from "react";
import { Form, Button, Alert } from "react-bootstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { checkUser } from "../../helpers";

const CrearReceta = () => {
    //inicializar useNavigate
    const navigate = useNavigate();

    useEffect(()=>{
        const usuario = checkUser();
        if (usuario === null) navigate('/login');
        else if (usuario.valido===false) navigate('/login');
        else if (usuario.perfil!=='admin') navigate('/');
    }, []);

    const API_URL = process.env.REACT_APP_API_URL;

    const [nombre, setNombre] = useState("");
    const [imagen, setImagen] = useState("");
    const [ingredientes, setIngredientes] = useState("");
    const [instrucciones, setInstrucciones] = useState("");

    const [mensajeError, setMensajeError] = useState(false);

    const handleSubmit = async(e)=>{
        e.preventDefault();

        //validar

        //crear el objeto
        const receta = {
            nombre,
            imagen,
            ingredientes,
            instrucciones
        }

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
                    <Form.Control type="text" placeholder="Ej: Empanadas de carne" onChange={(e) => setNombre(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formImagen">
                    <Form.Label>Imagen</Form.Label>
                    <Form.Control type="text" placeholder="Pegar la dirección de una imágen" onChange={(e) => setImagen(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formIngredientes">
                    <Form.Label>Ingredientes</Form.Label>
                    <Form.Control as="textarea" rows={4} placeholder="Ej: 
                    -200g de harina, 
                    -1/2kg de carne, 
                    -..." onChange={(e) => setIngredientes(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formInstrucciones">
                    <Form.Label>Instrucciones</Form.Label>
                    <Form.Control as="textarea" rows={4} placeholder="Ej:
                        1-preparar la masa
                        2-cortar la carne a cuchillo
                        3-..." onChange={(e) => setInstrucciones(e.target.value)} />
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
