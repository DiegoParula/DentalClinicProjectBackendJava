
export const getAllPacientes = (url)=>{
    return fetch(url)
        .then(respnse => respnse.json())
        .then(data => data);
};

export const getPacienteById = (url, id)=>{
    return fetch(`${url}/${id}`)
        .then(response => response.json())
        .then(data => data);

};



export const deletePacienteById = (url, id)=>{
    const settings = {
        method: "DELETE"
    }
    return fetch(`${url}/eliminar/${id}`, settings);
};

export const createPaciente = (url, paciente)=>{
    const settings = {
        method: "POST",
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(paciente)
    };

    return fetch(`${url}/registrar`, settings)
        .then(response => response.json())
        .then(data => data)
        .catch(error =>{
            return error;
        });
};



export const updatePaciente = (url, paciente) =>{
    const settings = {
        method: "PUT",
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(paciente)
    };

    return fetch(`${url}/actualizar`, settings)
        .then(response => response.json())
        .then(data => data)
        .catch(error =>{
            return error;
        });
};