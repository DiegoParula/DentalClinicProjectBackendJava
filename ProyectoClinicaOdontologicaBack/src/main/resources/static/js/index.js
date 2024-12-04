import { Home } from "./Views/Home.js";
import { Odontologos } from "./Views/Odontologos.js";
import { Pacientes } from "./Views/Pacientes.js";
import { Turnos } from "./Views/Turnos.js";

const toggle = document.querySelector(".toggle");
const menuDashboard = document.querySelector(".menu-dashboard");
const menuIcon = toggle.querySelector("i");
const menuLinks = document.querySelectorAll(".link");
const search = document.querySelector(".input-search");
const inputSearch = document.querySelector("input");

const main = document.querySelector("main");
const home = document.querySelector(".link-home");
const odontologo = document.querySelector(".link-odontologo");
const paciente = document.querySelector(".link-paciente");
const turno = document.querySelector(".link-turno");

const dashboard = document.querySelector(".dashboard-content");

toggle.addEventListener("click", ()=>{
    menuDashboard.classList.toggle("open");

    if(menuIcon.classList.contains("bx-menu")){
        menuIcon.classList.replace("bx-menu", "bx-x");
    }
    else{
        menuIcon.classList.replace("bx-x", "bx-menu");
    }
});

menuLinks.forEach(link => {
    link.addEventListener("click",() =>{
        menuDashboard.classList.add("open");
        menuIcon.classList.replace("bx-menu", "bx-x");
    })
});

search.addEventListener("click", ()=>{
    menuDashboard.classList.add("open");
    menuIcon.classList.replace("bx-menu", "bx-x");
    search.querySelector("input").focus();
});

inputSearch.addEventListener("input", ()=>{
    // const searchTerm = inputSearch.value.toLowerCase();
    // const found = findPaciente(searchTerm);

    // renderFounded(dashboard, found);
});


home.addEventListener("click",()=>{
    closeAndClear();
    Home(dashboard);
});

odontologo.addEventListener("click", ()=>{
    closeAndClear();
    Odontologos(dashboard);
});

paciente.addEventListener("click", ()=>{
    closeAndClear();
    Pacientes(dashboard);
});

turno.addEventListener("click", ()=>{
    closeAndClear();
    Turnos(dashboard);
});


menuLinks.forEach(link =>{
    link.onmouseenter = ()=>{
        menuDashboard.classList.add("open");
        menuIcon.classList.replace("bx-menu", "bx-x");
    }
});

const closeAndClear = ()=>{
    menuIcon.classList.replace("bx-x", "bx-menu");
    menuDashboard.classList.remove("open");
    inputSearch.value = '';
}

Home(dashboard);
