import React, {useEffect, useState} from 'react';

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
        <div>
            <h2>Home</h2>
        </div>
    );
};

export default Home;