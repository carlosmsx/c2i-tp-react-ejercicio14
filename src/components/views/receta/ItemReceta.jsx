import React from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import {Link} from 'react-router-dom';

const ItemReceta = ({ receta, consultarAPI }) => {
    const { nombre, _id, imagen, ingredientes, instrucciones } = { ...receta };
    const URL_API = process.env.REACT_APP_API_URL;

    const handleDelete = () => {
        Swal.fire({
            title: "Está seguro?",
            text: "no podrá deshacer esta operación!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Borrar",
            cancelButtonText: "Cancelar",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    //realizar peticion DELETE
                    const respuesta = await fetch(URL_API+'/'+_id,{
                        method: "DELETE"
                    });

                    if (respuesta.status ===200)
                    {
                        Swal.fire("Receta eliminada!", "La receta fue correctamente eliminada.", "success");
                    }
                    //recargar tabla de recetas
                    consultarAPI();
                } catch (error) {
                    Swal.fire("Error al eliminar", "Se produjo un error al intentar eliminar la receta, por favor aguarde unos minutos e intente nuevamente", "error");
                }
            }
        });
    };
    return (
        <tr>
            {/* <td>{_id}</td> */}
            <td>{nombre}</td>
            {/* <td>{imagen}</td> */}
            <td className="truncate">{ingredientes}</td>
            <td className="truncate">{instrucciones}</td>
            <td>
                <Link className="me-1 btn btn-success" to={`/receta/detalle/${_id}`}>Detalle</Link>
                <Link className="me-1 btn btn-warning" to={`/receta/editar/${_id}`}>Editar</Link>
                <Button variant="danger" onClick={handleDelete}>
                    Borrar
                </Button>
            </td>
        </tr>
    );
};

export default ItemReceta;