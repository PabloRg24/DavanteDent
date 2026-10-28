
class Cita {
    constructor(nombre, apellidos, dni, telefono, correo, fechaNacimiento, observaciones, fecha) {
        this.id = Date.now();
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.dni = dni;
        this.telefono = telefono;
        this.correo = correo;
        this.fechaNacimiento = fechaNacimiento;
        this.observaciones = observaciones;
        this.fecha = fecha;
    }
}
