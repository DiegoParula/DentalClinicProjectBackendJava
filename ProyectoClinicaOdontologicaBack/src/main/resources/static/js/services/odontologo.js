
export const getAllOdontologos = (url)=>{
    return fetch(url)
        .then(respnse => respnse.json())
        .then(data => data);
};

export const getOdontologoById = (url, id)=>{
    return fetch(`${url}/${id}`)
        .then(response => response.json())
        .then(data => data)
        .catch(error =>{
            return error;
        })
};

export const deleteOdontologoById = (url, id)=>{
    const settings = {
        method: "DELETE"
    }
    return fetch(`${url}/eliminar/${id}`, settings);
};

export const createOdontologo = (url, ondontologo)=>{
    const settings = {
        method: "POST",
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(ondontologo)
    };

    return fetch(`${url}/registrar`, settings)
        .then(response => response.json())
        .then(data => data)
        .catch(error =>{
            return error;
        });
};

export const updateOdontologo = (url, ondontologo) =>{
    const settings = {
        method: "PUT",
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(ondontologo)
    };

    return fetch(`${url}/actualizar`, settings)
        .then(response => response.json())
        .then(data => data)
        .catch(error =>{
            return error;
        });
};