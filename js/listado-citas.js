
function leerCookie(nombre) {
    const cookies = document.cookie.split("; ");

    for (let cookie of cookies) {
        const [clave, valor] = cookie.split("=");

        if (clave === nombre) {
            return decodeURIComponent(valor);
        }
    }

    return null;
}

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
        celda.colSpan = 9;

        fila.appendChild(celda);
        cuerpoTabla.appendChild(fila);

        return;
    } 
    // Recorremos todas las citas guardadas
    citas.forEach(function (cita) {
        const fila = document.createElement("tr");

        const datos = [
            cita.fecha,
            cita.nombre,
            cita.apellidos,
            cita.dni,
            cita.telefono,
            cita.correo,
            cita.fechaNacimiento,
            cita.observaciones,
            ""
        ];

        datos.forEach(function (dato) {
            const celda = document.createElement("td");
            celda.textContent = dato || "-";
            fila.appendChild(celda);
        });

        cuerpoTabla.appendChild(fila);
    });

}

document.addEventListener("DOMContentLoaded", mostrarCitas);