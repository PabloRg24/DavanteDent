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