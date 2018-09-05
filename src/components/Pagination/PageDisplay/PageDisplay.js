import React from 'react';

const pageDisplay = (props)=>{
    return <p>Página {props.current} de {props.total}</p>
}

export default pageDisplay;