import { TopList } from "../components/topList.js";
import { getAllOdontologos, getOdontologoById } from "../services/odontologo.js";
import { getAllPacientes, getPacienteById } from "../services/paciente.js";
import { createTurno, deleteTurnoById, getAllTurnos, getTurnoById, updateTurno } from "../services/turno.js";
import { modalTurno } from "../templates/turnoTemplates.js";
import { minFecha, msjError, msjExito } from "../utils.js";

const URL = 'http://localhost:8080/turnos';
const URL_PAC = 'http://localhost:8080/pacientes';
const URL_OD = 'http://localhost:8080/odontologos';


export const Turnos = async (dashboard)=>{
    const turnos = await getAllTurnos(URL);

    const ul = document.createElement('ul');
    ul.classList.add('list');

    turnos.forEach(async(turno) =>{
        const paciente = await getPacienteById(URL_PAC,turno.paciente);
        const odontologo = await getOdontologoById(URL_OD, turno.odontologo);
        
        const li = document.createElement('li');
        li.classList.add('list-item')
        li.innerHTML = `
            <div class="list-item_element">
                <p>Pac:  ${paciente.apellido}</p>
                <p>Odont:  ${odontologo.apellido}</p>
                <p>Fecha: ${turno.fecha}</p>
            </div>

            <div class="action_buttons">
                <button data-id=${turno.id} class="button btnEdit"><i class='bx bxs-edit'></i> Editar</button>
                <button data-id=${turno.id} class="button btnDelete"><i class='bx bx-trash'></i> Eliminar</button>
            </div>
        `;
        ul.appendChild(li);
    })
    
    dashboard.innerHTML = "";
    TopList(dashboard, 'turnos', Turnos)
    dashboard.appendChild(ul);

    setTimeout(()=>{
        addListeners(dashboard);
    }, 200);

}

const addListeners = (dashboard)=>{

    const btnsEdit = document.querySelectorAll(".btnEdit");
    const btnsDelete = document.querySelectorAll('.btnDelete');

    btnsEdit.forEach((btn) =>{
        btn.addEventListener('click', async()=>{
            let turno = await getTurnoById(URL, btn.dataset.id);

            const pacientes = await getAllPacientes(URL_PAC);
            const odontologos = await getAllOdontologos(URL_OD);

            const modal = modalTurno('editar', turno, pacientes, odontologos);
            
            dashboard.appendChild(modal);
            
            const editTurno = document.querySelector('.add-turno');

            editTurno.addEventListener('click', async(event)=>{
                event.preventDefault();

                const pacienteValue = document.getElementById('pacientes').value;
                const odontologoValue = document.getElementById('odontologos').value;
                const fecha = document.getElementById('fecha').value;
                const time = document.getElementById('time').value;
                const id = document.querySelector('.add-turno').dataset.id;
        
                const timeStamp = `${fecha}T${time}`;
        
                const paciente = await getPacienteById(URL_PAC, pacienteValue);
                const odontologo = await getOdontologoById(URL_OD, odontologoValue);
        
        
                const turno = {
                    id:id,
                    paciente: paciente,
                    odontologo: odontologo,
                    fecha: timeStamp
                };

                const update = await updateTurno(URL, turno);
                if(update.id){
                    Turnos(dashboard);
                    msjExito('Turno editado correctamente');
                }else{
                    msjError('Verifique fecha y hora ingresado');
                }

            });

            const closeModal = document.querySelectorAll('.close-modal');
            closeModal.forEach((btn) => {
                btn.addEventListener('click', ()=>{
                    dashboard.removeChild(modal);
                    modal.classList.toggle('closed');
                    Turnos(dashboard);
                });
            })
            
        })
    });

    btnsDelete.forEach((btn) => {
        const id = btn.dataset.id;

        btn.addEventListener ('click', async ()=>{
            let result =  await Swal.fire({
                title:'Atención',
                text: `Desea eliminar el turno con id ${id}`,
                icon: 'warning',
                confirmButtonText: 'Aceptar',
                showCancelButton: true,
                cancelButtonText: 'Cancelar'
            })
            
            if(result.value === true){
                const response = await deleteTurnoById(URL, id);
                if(response.status === 200){
                    Turnos(dashboard);
                    msjExito('Turno eliminado');
                }else{
                    msjError('Error al eliminar Turno');
                }

            }

        })
    })
}


export const TurnosAdd = async(dashboard)=>{
    const modal = modalTurno('agregar');
    dashboard.appendChild(modal);

    const pacientes = await getAllPacientes('http://localhost:8080/pacientes');
    const odontologos = await getAllOdontologos('http://localhost:8080/odontologos');

    const pacientesInput = document.getElementById('pacientes');
    const odontologosInput = document.getElementById('odontologos');

    pacientes.forEach(paciente =>{
        const option = document.createElement('option');
        option.value = paciente.id;
        option.textContent = `${paciente.id} - ${paciente.nombre} ${paciente.apellido}`;
        pacientesInput.appendChild(option);
    });

    odontologos.forEach(odontologo =>{
        const option = document.createElement('option');
        option.value = odontologo.id;
        option.textContent = `${odontologo.matricula} - ${odontologo.nombre} ${odontologo.apellido}`;
        odontologosInput.appendChild(option);
    });

    minFecha('fecha');

    const addOd = document.querySelector('.add-turno');
    addOd.addEventListener('click', async(event)=>{

        event.preventDefault();

        const pacienteValue = document.getElementById('pacientes').value;
        const odontologoValue = document.getElementById('odontologos').value;
        const fecha = document.getElementById('fecha').value;
        const time = document.getElementById('time').value;

        const timeStamp = `${fecha}T${time}`;

        const paciente = await getPacienteById('http://localhost:8080/pacientes', pacienteValue);
        const odontologo = await getOdontologoById('http://localhost:8080/odontologos', odontologoValue);


        const turno = {
            paciente: paciente,
            odontologo: odontologo,
            fecha: timeStamp
        };


        const add = await createTurno(URL, turno);
        
        if(add.id){
            Turnos(dashboard);
            modal.classList.toggle('closed');
            msjExito('Turno creado con exito');
        }else{
            msjError('Verifique la fecha y hora ingresado');
        }

    });

    const closeModal = document.querySelectorAll('.close-modal');
    closeModal.forEach((btn) => {
        btn.addEventListener('click', ()=>{
            dashboard.removeChild(modal);
            modal.classList.toggle('closed');
        });
    })
};


