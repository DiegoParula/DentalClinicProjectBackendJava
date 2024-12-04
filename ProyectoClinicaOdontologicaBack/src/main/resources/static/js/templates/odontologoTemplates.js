
export const odontologosList = (odontologos) =>{
    const ul = document.createElement('ul');
    ul.classList.add('list');

    odontologos.forEach((odontologo) =>{
        const li = document.createElement('li');
        li.classList.add('list-item')
        li.innerHTML = `
            <div class="list-item_element">
                <p>${odontologo.nombre}</p>
                <p>${odontologo.apellido}</p>
                <p>${odontologo.matricula}</p>
            </div>
            <div class="action_buttons">
                <button data-id=${odontologo.id} class="button btnEdit"><i class='bx bxs-edit'></i> Editar</button>
                <button data-id=${odontologo.id} class="button btnDelete"><i class='bx bx-trash'></i> Eliminar</button>
            </div>
        `;
        ul.appendChild(li);
    });

    return ul;
};

export const modalOdontologo = (type, odontologo)=>{
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.setAttribute('id', 'modal');

    modal.innerHTML = `
    <div class="modal-content">
        <span class="close-modal">&times;</span>
        <h2>${ type === 'editar' ? "Edición de Odontologo" : "Ingresar datos del odontologo"}</h2>
        <form action="" class="modal_form">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required ${odontologo ? `value=${odontologo.nombre}` : '' }>

            <label for="apellido">Apellido:</label>
            <input type="text" id="apellido" name="apellido" required ${odontologo ? `value=${odontologo.apellido}` : '' }>

            <label for="matricula">Matricula:</label>
            <input type="number" id="matricula" name="matricula" required ${odontologo ? `value=${odontologo.matricula}` : '' }>

            <div class="form_buttons">
                <button class="button close-modal">Cancelar</button>
                <button class="button add-odontologo" ${odontologo ? `data-id=${odontologo.id}` : ''}>${type === 'editar' ? "Editar" : "Agregar" }</button>
            </div>
        </form>
    </div>
    `;

    return modal;
}