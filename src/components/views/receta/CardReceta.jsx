import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CardReceta = ({ receta }) => {
  return (
    <Card className='my-4'>
        <Card.Img variant="top" src={receta.imagen} className="img-fluid"/>
        <Card.Body>
          <Card.Title>{receta.nombre}</Card.Title>
          {/* <Card.Subtitle>Ingredientes</Card.Subtitle>
          <Card.Text>{receta.ingredientes}</Card.Text>
          <Card.Subtitle>Instrucciones</Card.Subtitle>
          <Card.Text>{receta.instrucciones}</Card.Text> */}
        </Card.Body>
        <Card.Footer>
          <Link to={`/receta/detalle/${receta._id}`} className='btn btn-danger me-2'>Ver más</Link>
        </Card.Footer>
    </Card>    
  );
};

export default CardReceta;