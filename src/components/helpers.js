export const cantidadCaracteres = (input, min, max)=>{
    return (input.length >= min && input.length <= max) ?  true: false;
}

export const validarUrl = (input)=>{
    //const patron = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    const patron = /\w/;
    return patron.test(input);
}

