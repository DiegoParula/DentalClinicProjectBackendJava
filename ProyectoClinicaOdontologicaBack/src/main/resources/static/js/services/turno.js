export const getAllTurnos = (url)=>{
    return fetch(url)
        .then(respnse => respnse.json())
        .then(data => data);
};

export const getTurnoById = (url, id)=>{
    return fetch(`${url}/${id}`)
        .then(response => response.json())
        .then(data => data);
};

export const deleteTurnoById = (url, id)=>{
    const settings = {
        method: "DELETE"
    }
    return fetch(`${url}/eliminar/${id}`, settings);
};

export const createTurno = (url, turno)=>{
    const settings = {
        method: "POST",
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(turno)
    };

    return fetch(`${url}/registrar`, settings)
        .then(response => response.json())
        .then(data => data)
        .catch(error =>{
            return error;
        });
};

export const updateTurno = (url, turno) =>{
    const settings = {
        method: "PUT",
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(turno)
    };

    return fetch(`${url}/actualizar`, settings)
        .then(response => response.json())
        .then(data => data)
        .catch(error =>{
            return error;
        });
};