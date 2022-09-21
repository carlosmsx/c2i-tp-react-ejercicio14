import React, {useEffect, useState} from 'react';
import CardReceta from "./receta/CardReceta";
import { Row, Col } from "react-bootstrap";

const Home = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const [recetas, setRecetas] = useState([]);
    
    useEffect(()=>{
        traerRecetas();
    }, []);
    
    const traerRecetas = async()=>{
        try {
            const respuesta = await fetch(API_URL);
            const listaRecetas = await respuesta.json();
            setRecetas(listaRecetas);
            console.log(listaRecetas);
        } catch (error) {
            console.log(error);
            //TODO: mostrar alert
        }
    }

    return (

        <div className="container">
            <h1 className="display-4 m-4">Listado de recetas</h1>
            <hr />
            <Row xs={1} md={4} className="g-4">
                {recetas.map((receta) => (
                    <Col key={receta._id}>
                        <CardReceta receta={receta}></CardReceta>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Home;