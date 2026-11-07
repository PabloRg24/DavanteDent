
function guardarCookie(nombre, valor) {
    document.cookie =
        nombre + "=" + encodeURIComponent(valor) +
        "; max-age=2592000; path=/; SameSite=Lax";
}


function leerCookie(nombre) {
    const cookies = document.cookie.split("; ");

    for (let cookie of cookies) {
        const [clave, ...partes] = cookie.split("=");

        if (clave === nombre) {
            return decodeURIComponent(partes.join("="));
        }
    }

    return null;
}


function validateForm() {
    let valido = true;

    // Obtenemos los valores de los campos
    const name = document.getElementById("name").value.trim();
    const surname = document.getElementById("surname").value.trim();
    const email = document.getElementById("email").value.trim();
    const dni = document.getElementById("dni").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const birthday = document.getElementById("birthday").value;
    const date = document.getElementById("date").value;

    // Limpiamos los mensajes anteriores
    document.querySelectorAll(".error").forEach(function (mensaje) {
        mensaje.textContent = "";
    });

   // Comprobamos el nombre
    if (name === "") {
        document.getElementById("error-name").textContent =
            "Introduce el nombre";
        valido = false;
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/.test(name)) {
        document.getElementById("error-name").textContent =
            "Introduce un nombre correcto";
        valido = false;
    }

    // Comprobamos los apellidos
    if (surname === "") {
        document.getElementById("error-surname").textContent =
            "Introduce los apellidos";
        valido = false;
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/.test(surname)) {
        document.getElementById("error-surname").textContent =
            "Introduce un apellido correcto";
        valido = false;
    }

    // Comprobamos el correo
    if (email === "") {
        document.getElementById("error-email").textContent =
            "Introduce el correo electrónico";
        valido = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById("error-email").textContent =
            "Introduce un correo válido (debe incluir @ y un punto)";
        valido = false;
    }

   // Comprobamos el DNI
    if (dni === "") {
        document.getElementById("error-dni").textContent =
            "Introduce el DNI";
        valido = false;
    } else if (!/^\d{8}[a-zA-Z]$/.test(dni)) {
        document.getElementById("error-dni").textContent =
            "El DNI debe tener 8 números y una letra";
        valido = false;
    }

    // Comprobamos el teléfono
    if (phone === "") {
        document.getElementById("error-phone").textContent =
            "Introduce el teléfono";
        valido = false;
    } else if (!/^\d{9}$/.test(phone)) {
        document.getElementById("error-phone").textContent =
            "El teléfono solo puede contener 9 dígitos";
        valido = false;
    }

    // Comprobamos la fecha de nacimiento
    if (birthday === "") {
        document.getElementById("error-birthday").textContent =
            "Introduce la fecha de nacimiento";
        valido = false;
    }

    // Comprobamos la fecha de la cita
    if (date === "") {
        document.getElementById("error-date").textContent =
            "Introduce la fecha de la cita";
        valido = false;
    }

    return valido;
}

function cargarCitaParaModificar() {
    const idCita = sessionStorage.getItem("idCitaModificar");

    if (!idCita) {
        return;
    }

    let citas;

    try {
        citas = JSON.parse(leerCookie("citas") || "[]");
    } catch (error) {
        alert("No se pudieron recuperar las citas guardadas.");
        return;
    }

    if (!Array.isArray(citas)) {
        alert("No se pudieron recuperar las citas guardadas.");
        return;
    }

    const cita = citas.find(function (citaGuardada) {
        return String(citaGuardada.id) === idCita;
    });

    if (!cita) {
        alert("No se ha encontrado la cita que quieres modificar.");
        return;
    }

    const campoId = document.getElementById("id-cita");
    campoId.value = idCita;
    campoId.defaultValue = idCita;
    sessionStorage.removeItem("idCitaModificar");

    document.getElementById("name").value = cita.nombre;
    document.getElementById("surname").value = cita.apellidos;
    document.getElementById("dni").value = cita.dni;
    document.getElementById("phone").value = cita.telefono;
    document.getElementById("email").value = cita.correo;
    document.getElementById("birthday").value = cita.fechaNacimiento;
    document.getElementById("obser").value = cita.observaciones;
    document.getElementById("date").value = cita.fecha;
}

    cargarCitaParaModificar();
    
    document.getElementById("formulario-cita").addEventListener("reset", function () {
        document.querySelectorAll(".error").forEach(function (mensaje) {
            mensaje.textContent = "";
        });
    });

    
document.getElementById("formulario-cita").addEventListener("submit", function (event) {
    event.preventDefault();

    if (!validateForm()) {
        return;
    }

    // Creamos una nueva cita con los datos del formulario
    const cita = new Cita(
        document.getElementById("name").value.trim(),
        document.getElementById("surname").value.trim(),
        document.getElementById("dni").value.trim().toUpperCase(),
        document.getElementById("phone").value.trim(),
        document.getElementById("email").value.trim(),
        document.getElementById("birthday").value,
        document.getElementById("obser").value.trim(),
        document.getElementById("date").value
    );

    // Recuperamos las citas guardadas anteriormente
    let citas = [];
    const datosGuardados = leerCookie("citas");

    if (datosGuardados !== null) {
        try {
            citas = JSON.parse(datosGuardados);

            if (!Array.isArray(citas)) {
                citas = [];
            }
        } catch (error) {
            alert("No se pudieron recuperar las citas guardadas.");
            return;
        }
    }

const idCita = document.getElementById("id-cita").value;

if (idCita) {
    const indiceCita = citas.findIndex(function (citaGuardada) {
        return String(citaGuardada.id) === idCita;
    });

    if (indiceCita === -1) {
        alert("No se ha encontrado la cita que quieres modificar.");
        return;
    }

    cita.id = citas[indiceCita].id;
    citas[indiceCita] = cita;
} else {
    citas.push(cita);
}

guardarCookie("citas", JSON.stringify(citas));
alert(idCita ? "¡Cita modificada correctamente!" : "¡Cita guardada correctamente!");
});