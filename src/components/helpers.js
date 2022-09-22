export const cantidadCaracteres = (input, min, max)=>{
    return (input.length >= min && input.length <= max) ?  true: false;
}

export const validarUrl = (input)=>{
    //const patron = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    const patron = /\w/;
    return patron.test(input);
}

export const checkUser = () => {
    const KEY = process.env.REACT_APP_LOCALSTORAGE_KEY;
    const usuario = JSON.parse(localStorage.getItem(KEY)) || null;
    
    return usuario;
}

export const validateUser = (usuario) => {
    const KEY = process.env.REACT_APP_LOCALSTORAGE_KEY;
    localStorage.setItem(KEY, JSON.stringify(usuario));
}

export const invalidateUser = (usuario) => {
    const KEY = process.env.REACT_APP_LOCALSTORAGE_KEY;
    localStorage.setItem(KEY, null);
}