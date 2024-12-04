
export const minFecha = (elementId) =>{
    let fecha = new Date();
    let anio = fecha.getFullYear();
    let dia = fecha.getDate();
    let _mes = fecha.getMonth();
    _mes = _mes + 1;
    let mes;
    if (_mes < 10){ 
        mes = "0" + _mes;
    }
    else { 
        mes = _mes.toString;
    }
    document.getElementById(elementId).min = `${anio}-${mes}-${dia}`;
};

export const msjExito = async(msj)=>{
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-right',
        iconColor: 'green',
        customClass: {
            popup: 'colored-toast'
        },
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true
    });
    await Toast.fire({
        icon: 'success',
        title: `${msj}`
    })
}

export const msjError = async(msj) =>{
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-right',
        iconColor: 'red',
        customClass: {
            popup: 'colored-toast'
        },
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
    });
    await Toast.fire({
        icon: 'error',
        title: `${msj}`
    })
}