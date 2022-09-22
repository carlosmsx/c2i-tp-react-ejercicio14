import { useEffect, useState, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { checkUser, cantidadCaracteres } from "../../helpers";

const EditarReceta = () => {
    //recuperar datos de la receta
    const { id } = useParams();

    //variable de entorno
    const URL_API = process.env.REACT_APP_API_URL;

    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    const [mensajeError, setMensajeError] = useState("");

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value,
        });
        // Check and see if errors exist, and remove them from the error object:
        if (!!errors[field])
            setErrors({
                ...errors,
                [field]: null,
            });
    };

    const findFormErrors = () => {
        const { nombre, imagen, ingredientes, instrucciones } = form;
        const newErrors = {};
        // nombre errors
        if (!nombre || nombre === "") newErrors.nombre = "Ingrese un nombre";
        else if (!cantidadCaracteres(nombre, 2, 30)) newErrors.nombre = "El nombre debe tener entre 2 y 30 caracteres";

        // imagen errors
        if (!imagen || imagen === "") newErrors.imagen = "Ingrese url de imagen";
        else if (!cantidadCaracteres(imagen, 1, 100)) newErrors.imagen = "La imagen debe tener entre 1 y 100 caracteres";
        //else if (!validarUrl(imagen)) newErrors.imagen = 'Ingrese una URL válida'

        // ingredientes errors
        if (!ingredientes || ingredientes === "") newErrors.ingredientes = "Ingrese los ingredientes";
        else if (!cantidadCaracteres(ingredientes, 1, 200))
            newErrors.ingredientes = "Los ingredientes deben tener entre 1 y 200 caracteres";

        // instrucciones errors
        if (!instrucciones || instrucciones === "") newErrors.instrucciones = "Ingrese las instrucciones";
        else if (!cantidadCaracteres(instrucciones, 1, 200))
            newErrors.instrucciones = "Las instrucciones deben tener entre 1 y 200 caracteres";

        return newErrors;
    };

    const navigate = useNavigate();

    useEffect(() => {
        const usuario = checkUser();
        if (usuario === null || usuario.valido === false || usuario.perfil !== "admin") navigate("/login");

        consultarAPI();
    }, []);

    const consultarAPI = async () => {
        try {
            const respuesta = await fetch(URL_API + `/${id}`);
            const dato = await respuesta.json();
            setForm({
                nombre: dato.nombre,
                imagen: dato.imagen,
                ingredientes: dato.ingredientes,
                instrucciones: dato.instrucciones,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        //validar
        const newErrors = findFormErrors();
        if (Object.keys(newErrors).length > 0) {
            // We got errors!
            setErrors(newErrors);
            return;
        }

        //creo el objeto
        const receta = {
            ...form,
            _id: id,
        };

        //pedir a la api la actualizacion
        try {
            const respuesta = await fetch(URL_API + `/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(receta),
            });
            if (respuesta.status === 200) {
                Swal.fire("Receta modificada", "La receta fue modificada correctamente", "success");

                //redirecciono a la tabla de recetas
                navigate("/receta/administrar");
            }
        } catch (error) {
            console.log(error);
            //TODO
        }
    };

    return (
        <section className="container">
            <h1 className="display-4 mt-5">Editar Receta</h1>
            <hr />
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formNombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        value={form.nombre}
                        onChange={(e) => setField("nombre", e.target.value)}
                        isInvalid={!!errors.nombre}
                    />
                    <Form.Control.Feedback type="invalid">{errors.nombre}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formImagen">
                    <Form.Label>Imagen</Form.Label>
                    <Form.Control
                        type="text"
                        value={form.imagen}
                        onChange={(e) => setField("imagen", e.target.value)}
                        isInvalid={!!errors.imagen}
                    />
                    <Form.Control.Feedback type="invalid">{errors.imagen}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formIngredientes">
                    <Form.Label>Ingredientes</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        value={form.ingredientes}
                        onChange={(e) => setField("ingredientes", e.target.value)}
                        isInvalid={!!errors.ingredientes}
                    />
                    <Form.Control.Feedback type="invalid">{errors.ingredientes}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formInstrucciones">
                    <Form.Label>Instrucciones</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        value={form.instrucciones}
                        onChange={(e) => setField("instrucciones", e.target.value)}
                        isInvalid={!!errors.instrucciones}
                    />
                    <Form.Control.Feedback type="invalid">{errors.instrucciones}</Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit" className="me-1">
                    Guardar
                </Button>
                <Button
                    variant="secondary"
                    onClick={() => {
                        navigate(-1);
                    }}>
                    Cancelar
                </Button>
            </Form>
        </section>
    );
};

export default EditarReceta;
