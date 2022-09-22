import React, {useState} from "react";
import { Form, Button, Alert } from "react-bootstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { validateUser, invalidateUser } from "../helpers";

const Login = () => {
    const API_AUTH = process.env.REACT_APP_API_AUTH;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [mensajeError, setMensajeError] = useState(false);

    //inicializar useNavigate
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        //validar

        //crear el objeto
        const usuario = {
            email,
            password
        }

        if (email==='administrador')
        {
            usuario.valido=true;
            usuario.perfil='admin';
            validateUser(usuario);
            navigate("/receta/administrar");
        }
        else if (email==='usuario') 
        {
            usuario.valido=true;
            usuario.perfil='usuario';
            validateUser(usuario);
            navigate("/");
        }
        else {
            usuario.valido=false;
            invalidateUser(usuario);
        }

        /*
        try {
            const respuesta = await fetch(API_AUTH, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuario)
            });

            console.log(respuesta);
            if (respuesta.status === 201)
            {
                //usuario validado

                //redirecciono a página anterior
                navegacion(-1);
            }
            else {
                //usuario no validado
            }
        
        } 
        catch(error) {
            Swal.fire(
                'Error en Login',
                'No se pudo iniciar sesion, intente nuevamente en unos minutos',
                'error'
            );
        } 
        */
    }

    return (
        <section className="container">
            <h1 className="display-4 mt-5">Ingrese su usuario y contraseña</h1>
            <hr />
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="tumail@gmail.com" onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="text" onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submit" className="me-1">
                    Enviar
                </Button>
                <Button variant="secondary" onClick={()=>{navigate("/");}}>
                    Cancelar
                </Button>
            </Form>
            {mensajeError === true ? <Alert variant="danger">Debe corregir los datos</Alert> : null}
        </section>
    );
};

export default Login;
