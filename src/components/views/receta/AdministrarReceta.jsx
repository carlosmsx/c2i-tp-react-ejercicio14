import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Table } from "react-bootstrap";
import ItemReceta from "./ItemReceta";
import { Link } from "react-router-dom";

const AdministrarReceta = () => {
    const API_URL = process.env.REACT_APP_API_URL;

    const [recetas, setRecetas] = useState([]);

    useEffect(() => {
        consultarAPI();
    }, []);

    const consultarAPI = async () => {
        try {
            //GET
            const respuesta = await fetch(API_URL);
            const listaRecetas = await respuesta.json();
            setRecetas(listaRecetas);
        } catch (error) {
            console.log(error);
            //mostrar mensaje: espere unos minutos y vuelva a intentarlo
        }
    };

    return (
        <section className="container">
            <div className="d-flex justify-content-between align-item-center mt-5">
                <h1 className="display-4">Administrador de recetas</h1>
                <div className="d-flex flex-column justify-content-center">
                    <Link to="/receta/crear" className="btn btn-primary">
                        Agregar
                    </Link>
                </div>
            </div>
            <hr />
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        {/* <th>Cod</th> */}
                        <th>Receta</th>
                        {/* <th>Imagen</th> */}
                        <th>Ingredientes</th>
                        <th>Instrucciones</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {recetas.map((receta) => (
                        <ItemReceta key={receta._id} receta={receta} consultarAPI={consultarAPI} />
                    ))}
                </tbody>
            </Table>
        </section>
    );
};

export default AdministrarReceta;
