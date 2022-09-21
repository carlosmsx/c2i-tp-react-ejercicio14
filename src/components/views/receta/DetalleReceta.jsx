import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const DetalleReceta = () => {
    const { id } = useParams();
    console.log(id);

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
                <Link to="/" className="btn btn-primary">
                    Cerrar
                </Link>
            </Card>
        </div>
    );
};

export default DetalleReceta;
