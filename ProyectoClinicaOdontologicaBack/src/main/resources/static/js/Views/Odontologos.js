import { TopList } from "../components/topList.js";
import { createOdontologo, deleteOdontologoById, getAllOdontologos, getOdontologoById, updateOdontologo } from "../services/odontologo.js";
import { modalOdontologo, odontologosList } from "../templates/odontologoTemplates.js";
import { msjError, msjExito } from "../utils.js";

const URL = 'http://localhost:8080/odontologos';


export const Odontologos = async (dashboard)=>{
    const odontologos = await getAllOdontologos(URL);
    
    const ul = odontologosList(odontologos);

    dashboard.innerHTML = "";
    TopList(dashboard, 'odontologos', Odontologos)
    dashboard.appendChild(ul);

    addListeners(dashboard);
}

const addListeners = (dashboard)=>{
    const btnsEdit = document.querySelectorAll('.btnEdit');
    const btnsDelete = document.querySelectorAll('.btnDelete');

    btnsEdit.forEach((btn) =>{
        btn.addEventListener('click', async()=>{
            let odontologo = await getOdontologoById(URL, btn.dataset.id);

            const modal = modalOdontologo('editar', odontologo);

            dashboard.appendChild(modal);

            const editOd = document.querySelector('.add-odontologo');
            editOd.addEventListener('click', async(event)=>{
                event.preventDefault();

                const nombre = document.getElementById('nombre').value;
                const apellido = document.getElementById('apellido').value;
                const matricula = document.getElementById('matricula').value;        
                const id = document.querySelector('.add-odontologo').dataset.id;

                const odontologo = {
                    id: id,
                    nombre: nombre,
                    apellido: apellido,
                    matricula: matricula
                }

                const update = await updateOdontologo(URL, odontologo);

                if(update.id){
                    Odontologos(dashboard);
                    msjExito('Odontologo editado');
                }else{
                    msj.nombre && msjError(`${msj.nombre}`);
                    msj.apellido && msjError(msj.apellido);
                    msj.matricula && msjError(msj.matricula);
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
                text: `Desea eliminar el odontologo con id ${id}`,
                icon: 'warning',
                confirmButtonText: 'Aceptar',
                showCancelButton: true,
                cancelButtonText: 'Cancelar'
            });
            
            if(result.value === true){
                const response = await deleteOdontologoById(URL, id);

                if(response.ok){
                    Odontologos(dashboard);
                    msjExito('Odontologo eliminado');
                }else if(response.status === 500){
                    msjError('Odontologo con turnos asignados, error al eliminar');
                }else{
                    msjError('Error eliminando Odontologo');
                }

            }

        })
    })
}

export const odontologoAdd = (dashboard)=>{
    const modal = modalOdontologo('agregar');

    dashboard.appendChild(modal);

    const addOd = document.querySelector('.add-odontologo');
    addOd.addEventListener('click', async(event)=>{

        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const matricula = document.getElementById('matricula').value;

        const odontologo = {
            nombre: nombre,
            apellido: apellido,
            matricula: matricula
        }

        const msj = await createOdontologo(URL, odontologo);

        if(msj.id){
            modal.classList.toggle('closed');
            Odontologos(dashboard);
            msjExito('Odontologo creado con exito');
        }else{
            msj.nombre && msjError(`${msj.nombre}`);
            msj.apellido && msjError(msj.apellido);
            msj.matricula && msjError(msj.matricula);
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

