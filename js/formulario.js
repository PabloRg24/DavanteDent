
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


    document.getElementById("formulario-cita").addEventListener("reset", function () {
        document.querySelectorAll(".error").forEach(function (mensaje) {
            mensaje.textContent = "";
        });
    });

    document.getElementById("formulario-cita").addEventListener("submit", function (event) {
        if (!validateForm()) {
            event.preventDefault();
        }
});