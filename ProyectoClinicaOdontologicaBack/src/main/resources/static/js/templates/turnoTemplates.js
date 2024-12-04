
export const modalTurno = (type, turno, pacientes, odontologos)=>{
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.setAttribute('id', 'modal');

    let fecha, fechaInvertida, partesFecha,  hora;
    if( turno){
        fecha = turno.fecha.split(' ');

        partesFecha = fecha[0].split("-");
        fechaInvertida = partesFecha[2] + "-" + partesFecha[1] + "-" + partesFecha[0];

    }

    modal.innerHTML = `
    <div class="modal-content">
        <span class="close-modal">&times;</span>
        <h2>${ type === 'editar' ? "Edición de Turno" : "Ingresar datos del Turno"}</h2>
        <form action="" class="modal_form">
            <label for="pacientes">Paciente:</label>
            <select name="pacientes" id="pacientes" required>
            ${pacientes && pacientes.map(paciente =>{
                return `<option value=${paciente.id} ${paciente.id === turno.paciente ? 'selected' : ''}>
                            ${paciente.id} - ${paciente.nombre} ${paciente.apellido}
                        </option>`
            })}
            </select>

            <label for="odontologos">Odontologo:</label>
            <select name="odontologos" id="odontologos" required>
            ${odontologos && odontologos.map(odontologo =>{
                return `<option value=${odontologo.id} ${odontologo.id === turno.odontologo ? 'selected' : ''}>
                            ${odontologo.id} - ${odontologo.nombre} ${odontologo.apellido}
                        </option>`
            })}
            </select>

            <label for="fecha">Fecha del turno:</label>
            <input type="date" id="fecha" name="fecha" required ${turno && `value=${fechaInvertida}`}>

            <label for="time">Hora del turno:</label>
            <input type="time" id="time" name="time" min="09:00" max="18:00" required ${turno && `value=${fecha[1]}`}>

            <div class="form_buttons">
                <button class="button close-modal">Cancelar</button>
                <button class="button add-turno" ${turno ? `data-id=${turno.id}` : ''}>${type === 'editar' ? "Editar" : "Agregar" }</button>
            </div>
        </form>
    </div>
    `;

    return modal;
}