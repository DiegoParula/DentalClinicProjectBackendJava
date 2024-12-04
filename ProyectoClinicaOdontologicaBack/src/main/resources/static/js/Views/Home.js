
import { Odontologos } from "./Odontologos.js";
import { Pacientes } from "./Pacientes.js";
import { Turnos } from "./Turnos.js";

export const Home = async (dashboard)=>{

    render({
        dashboard
    });

    addListener(dashboard);
}

const render = ({ dashboard })=>{
    dashboard.innerHTML = `
    <section class="section-home">
        <div class="home-card">
            <div>
                <i class='bx bxs-contact'></i>
            </div>
            <p>Odontologos</p>
        </div>
        <div class="home-card">
            <div>
                <i class='bx bx-user'></i>
            </div>
            <p>Pacientes</p>
        </div>
        <div class="home-card">
            <div>
                <i class='bx bx-calendar'></i>
            </div>
            <p>Turnos</p>
        </div>
    </section>
        `
}

const addListener = (dashboard)=>{
    const cards = document.querySelectorAll(".home-card");
    cards.forEach(card =>{
        const titleCard = card.querySelectorAll("p")[0].innerText;

        card.addEventListener('click', ()=>{
            switch (titleCard) {
                case "Odontologos":
                    Odontologos(dashboard)
                    break;
                case "Pacientes":
                    Pacientes(dashboard)
                    break;
                case "Turnos":
                    Turnos(dashboard)
                    break
            }
        })
    })
}