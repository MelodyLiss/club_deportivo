
//!SCRIPT PARA PASAR LOS DATOS AL MODAL

const exampleModal = document.getElementById('exampleModal');
exampleModal.addEventListener('show.bs.modal', function (event) {

    const button = event.relatedTarget; // Botón que activó el modal
    const id = button.getAttribute('data-id'); 
    const nombre = button.getAttribute('data-nombre'); 
    const precio = button.getAttribute('data-precio'); 

    const inputId = document.getElementById('deporte-id'); 
    const labelNombre = document.getElementById('nombre-deporte'); 
    const labelPrecio = document.getElementById('precio-deporte'); 

    
    inputId.value = id; 
    labelNombre.textContent = nombre;
    labelPrecio.textContent = precio;
});
