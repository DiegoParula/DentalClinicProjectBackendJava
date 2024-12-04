import { odontologoAdd } from "../Views/Odontologos.js";
import { PacienteAdd } from "../Views/Pacientes.js";
import { TurnosAdd } from "../Views/Turnos.js";

export const TopList = (dashboard, service, parent) =>{
    dashboard.innerHTML = `
        <div class="title-list">
            <h2>Listado de ${service}</h2>
        </div>
    `;
    const topButtonList = document.createElement('div');
    topButtonList.classList.add('list_buttons');

    topButtonList.innerHTML = `
    <button class="button add-button">
        <i class='bx bxs-plus-circle'></i>
        Añadir nuevo
    </button>
    <button class="button refresh-list">
        <i class='bx bx-revision'></i>
        Actualizar listado
    </button>
    `;

    dashboard.appendChild(topButtonList);

    const addButton = document.querySelector('.add-button');
    addButton.addEventListener('click', ()=>{
        switch (service) {
            case 'odontologos':
                odontologoAdd(dashboard);
                break;
            case 'pacientes':
                PacienteAdd(dashboard);
                break;
            case 'turnos':
                TurnosAdd(dashboard);
                break;
        
            default:
                break;
        }
    });

    const refreshList = document.querySelector('.refresh-list');
    refreshList.addEventListener('click', ()=>{
        parent(dashboard);
    });
}
