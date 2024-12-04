
export const pacientesList = (pacientes)=>{
    
    const ul = document.createElement('ul');
    ul.classList.add('list');

    pacientes.forEach((paciente) =>{

        const li = document.createElement('li');
        li.classList.add('list-item')
        li.innerHTML = `
            <div class="row-list">
                <div class="list-item_element">
                    <p>${paciente.nombre}</p>
                    <p>${paciente.apellido}</p>
                    <p>${paciente.dni}</p>
                    <p>${paciente.fechaIngreso}</p>
                </div>
                <div class="list-item_element">
                    <p>${paciente.domicilioDto.calle}</p>
                    <p>${paciente.domicilioDto.numero}</p>
                    <p>${paciente.domicilioDto.localidad}</p>
                    <p>${paciente.domicilioDto.provincia}</p>
                </div>
            </div>
            <div class="action_buttons">
                <button data-id=${paciente.id} class="button btnEdit"><i class='bx bxs-edit'></i> Editar</button>
                <button data-id=${paciente.id} class="button btnDelete"><i class='bx bx-trash'></i> Eliminar</button>
            </div>
        `;
        ul.appendChild(li);
    });

    return ul;
};

export const modalPaciente = (type, paciente)=>{
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.setAttribute('id', 'modal');

    modal.innerHTML = `
    <div class="modal-content">
        <span class="close-modal">&times;</span>
        <h2>${ type === 'editar' ? "Edición de Paciente" : "Ingresar datos del paciente"}</h2>
        <form action="" class="modal_form">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required ${paciente ? `value=${paciente.nombre}` : '' }>

            <label for="apellido">Apellido:</label>
            <input type="text" id="apellido" name="apellido" required ${paciente ? `value=${paciente.apellido}` : '' }>

            <label for="dni">DNI:</label>
            <input type="number" id="dni" name="dni" required ${paciente ? `value=${paciente.dni}` : '' }>

            <label for="fechaIng">Fecha de Ingreso:</label>
            <input type="date" id="fechaIng" name="fechaIng" required ${paciente ? `value=${paciente.fechaIngreso}` : '' }>

            <label for="calle">Calle:</label>
            <input type="text" id="calle" name="calle" required ${paciente ? `value=${paciente.domicilioDto.calle}` : '' }>

            <label for="numero">Numero puerta:</label>
            <input type="number" id="numero" name="numero" required ${paciente ? `value=${paciente.domicilioDto.numero}` : '' }>

            <label for="localidad">Localidad:</label>
            <input type="text" id="localidad" name="localidad" required ${paciente ? `value=${paciente.domicilioDto.localidad}` : '' }>

            <label for="provincia">Provincia:</label>
            <input type="text" id="provincia" name="provincia" required ${paciente ? `value=${paciente.domicilioDto.provincia}` : '' }>

            <div class="form_buttons">
                <button class="button close-modal">Cancelar</button>
                <button class="button add-odontologo" ${paciente ? `data-id=${paciente.id}` : ''}>${type === 'editar' ? "Editar" : "Agregar" }</button>
            </div>
        </form>
    </div>
    `;



    return modal;
}