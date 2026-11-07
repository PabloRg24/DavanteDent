
function obtenerCitas() {
    const datos = leerCookie("citas");

    if (datos === null) {
        return [];
    }

    try {
        return JSON.parse(datos);
    } catch (error) {
        console.error("No se han podido leer las citas:", error);
        return [];
    }
}

function eliminarCita(id) {
    if (!confirm("¿Seguro que quieres eliminar esta cita?")) {
        return;
    }

    const citasActualizadas = obtenerCitas().filter(function (cita) {
        return String(cita.id) !== id;
    });

    guardarCookie("citas", JSON.stringify(citasActualizadas));
    mostrarCitas();
}

function mostrarCitas() {
    const citas = obtenerCitas();
    console.log(citas);
    const cuerpoTabla = document.getElementById("cuerpo-tabla");

    // Limpiamos el contenido de la tabla
    cuerpoTabla.innerHTML = "";

    // Comprobamos si hay citas
    if (citas.length === 0) {
        const fila = document.createElement("tr");
        const celda = document.createElement("td");

        celda.textContent = "Todavía no hay citas registradas.";
        celda.colSpan = 10;

        fila.appendChild(celda);
        cuerpoTabla.appendChild(fila);

        return;
    } 
    // Recorremos todas las citas guardadas
    citas.forEach(function (cita, indice) {
        const fila = document.createElement("tr");

        const datos = [
            indice + 1,
            cita.fecha,
            cita.nombre,
            cita.apellidos,
            cita.dni,
            cita.telefono,
            cita.correo,
            cita.fechaNacimiento,
            cita.observaciones
        ];

        datos.forEach(function (dato) {
            const celda = document.createElement("td");
            celda.textContent = dato || "-";
            fila.appendChild(celda);
        });

        const celdaAcciones = document.createElement("td");
        
        const botonModificar = document.createElement("button");
        botonModificar.type = "button";
        botonModificar.textContent = "Modificar";
        botonModificar.className = "boton-modificar";
        botonModificar.dataset.id = cita.id;
        
        const botonEliminar = document.createElement("button");
        botonEliminar.type = "button";
        botonEliminar.textContent = "Eliminar";
        botonEliminar.className = "boton-eliminar";
        botonEliminar.dataset.id = cita.id;
        
        celdaAcciones.appendChild(botonModificar);
        celdaAcciones.appendChild(botonEliminar);
        fila.appendChild(celdaAcciones);

        cuerpoTabla.appendChild(fila);
    });

}

document.addEventListener("DOMContentLoaded", function () {
    mostrarCitas();

    document.getElementById("cuerpo-tabla").addEventListener("click", function (event) {
        if (!(event.target instanceof Element)) {
            return;
        }
        const botonModificar = event.target.closest(".boton-modificar");

        if (botonModificar && botonModificar.dataset.id) {
            sessionStorage.setItem("idCitaModificar", botonModificar.dataset.id);
            window.location.href = "formulario.html";
            return;
        }
        const botonEliminar = event.target.closest(".boton-eliminar");

        if (botonEliminar && botonEliminar.dataset.id) {
            eliminarCita(botonEliminar.dataset.id);
        }
    });
});