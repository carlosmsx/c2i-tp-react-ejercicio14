import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

const DetalleReceta = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const API_URL = process.env.REACT_APP_API_URL;
    const [receta, setReceta] = useState({});

    useEffect(() => {
        consultarAPI();
    }, []);

    const consultarAPI = async () => {
        try {
            const respuesta = await fetch(API_URL + "/" + id);
            const dato = await respuesta.json();
            setReceta(dato);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container">
            <Card className="my-4">
                <Card.Img variant="top" src={receta.imagen} className="img-fluid" />
                <Card.Body>
                    <Card.Title>{receta.nombre}</Card.Title>
                    <Card.Subtitle>Ingredientes</Card.Subtitle>
                    <Card.Text>{receta.ingredientes}</Card.Text>
                    <Card.Subtitle>Instrucciones</Card.Subtitle>
                    <Card.Text>{receta.instrucciones}</Card.Text>
                </Card.Body>
                <Button className="btn btn-primary" onClick={()=>{navigate(-1);}}>
                    Cerrar
                </Button>
            </Card>
        </div>
    );
};

export default DetalleReceta;
