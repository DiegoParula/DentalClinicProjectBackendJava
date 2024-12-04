import { TopList } from "../components/topList.js";
import { createPaciente, deletePacienteById, getAllPacientes, getPacienteById, updatePaciente } from "../services/paciente.js";
import { modalPaciente, pacientesList } from "../templates/pacienteTemplate.js";
import { minFecha, msjError, msjExito } from "../utils.js";

const URL = 'http://localhost:8080/pacientes';


export const Pacientes = async (dashboard)=>{
    const pacientes = await getAllPacientes(URL);
    
    const ul = pacientesList(pacientes);

    dashboard.innerHTML = "";
    TopList(dashboard, 'pacientes', Pacientes)
    dashboard.appendChild(ul);

    addListeners(dashboard);
}

const addListeners = (dashboard)=>{
    const btnsEdit = document.querySelectorAll('.btnEdit');
    const btnsDelete = document.querySelectorAll('.btnDelete');

    btnsEdit.forEach((btn) =>{
        btn.addEventListener('click', async()=>{
            let paciente = await getPacienteById(URL, btn.dataset.id);

            const modal = modalPaciente('editar', paciente);

            dashboard.appendChild(modal);

            const editPac = document.querySelector('.add-odontologo');
            editPac.addEventListener('click', async(event)=>{
                event.preventDefault();

                const nombre = document.getElementById('nombre').value;
                const apellido = document.getElementById('apellido').value;
                const dni = document.getElementById('dni').value;
                const fechaIng = document.getElementById('fechaIng').value;
                const calle = document.getElementById('calle').value;
                const numero = document.getElementById('numero').value;
                const localidad = document.getElementById('localidad').value;
                const provincia = document.getElementById('provincia').value;
                const id = document.querySelector('.add-odontologo').dataset.id;


                const pacienteRegistrado = await getPacienteById(URL,id);

                const idDomicilio = pacienteRegistrado.domicilioDto.id;
        
                const paciente = {
                    id: id,
                    nombre: nombre,
                    apellido: apellido,
                    dni: dni,
                    fechaIngreso: fechaIng,
                    domicilio:{
                        id: idDomicilio,
                        calle: calle,
                        numero: numero,
                        localidad: localidad,
                        provincia: provincia
                    }
                }

                const update = await updatePaciente(URL, paciente);
                if(update.id){
                    Pacientes(dashboard);
                    msjExito('Paciente editado');
                }else{
                    if(update.nombre || update.apellido || update.dni || update.fechaIngreso){
                        update.nombre && msjError(`${update.nombre}`);
                        update.apellido && msjError(update.apellido);
                        update.dni && msjError(update.dni);
                        update.fechaIngreso && msjError(`${update.fechaIngreso}`);
                    }else{
                        msjError('Error en la dirección ingresada');
                    }
                }

            });

            const closeModal = document.querySelectorAll('.close-modal');
            closeModal.forEach((btn) => {
                btn.addEventListener('click', ()=>{
                    dashboard.removeChild(modal);
                    modal.classList.toggle('closed');
                });
            })
            
        })
    });

    btnsDelete.forEach((btn) => {
        const id = btn.dataset.id;

        btn.addEventListener ('click', async ()=>{
            let result =  await Swal.fire({
                title:'Atención',
                text: `Desea eliminar el paciente con id ${id}`,
                icon: 'warning',
                confirmButtonText: 'Aceptar',
                showCancelButton: true,
                cancelButtonText: 'Cancelar'
            })
            
            if(result.value === true){
                const response = await deletePacienteById(URL, id);
                if(response.status === 200){
                    Pacientes(dashboard);
                    msjExito('Paciente eliminado');
                }else if(response.status === 500){
                    msjError('Paciente con turnos asignados, error al eliminar');
                }else{
                    msjError('Error eliminando Odontologo');
                }
            }

        })
    })
}

export const PacienteAdd = (dashboard)=>{
    const modal = modalPaciente('agregar');

    dashboard.appendChild(modal);
    minFecha('fechaIng');

    const addOd = document.querySelector('.add-odontologo');
    addOd.addEventListener('click', async(event)=>{

        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const dni = document.getElementById('dni').value;
        const fechaIng = document.getElementById('fechaIng').value;
        const calle = document.getElementById('calle').value;
        const numero = document.getElementById('numero').value;
        const localidad = document.getElementById('localidad').value;
        const provincia = document.getElementById('provincia').value;


        const paciente = {
            nombre: nombre,
            apellido: apellido,
            dni: dni,
            fechaIngreso: fechaIng,
            domicilio:{
                calle: calle,
                numero: numero,
                localidad: localidad,
                provincia: provincia
            }
        }

        const msj = await createPaciente(URL, paciente);

        if(msj.id){
            modal.classList.toggle('closed');
            Pacientes(dashboard);
            msjExito('Paciente creado con exito');
        }else{
            if(msj.nombre || msj.apellido || msj.dni || msj.fechaIngreso){
                msj.nombre && msjError(`${msj.nombre}`);
                msj.apellido && msjError(msj.apellido);
                msj.dni && msjError(msj.dni);
                msj.fechaIngreso && msjError(`${msj.fechaIngreso}`);
            }else{
                msjError('Error en la dirección ingresada');
            }
            
        }



    });

    const closeModal = document.querySelectorAll('.close-modal');
    closeModal.forEach((btn) => {
        btn.addEventListener('click', ()=>{
            dashboard.removeChild(modal);
            modal.classList.toggle('closed');
        });
    })


}