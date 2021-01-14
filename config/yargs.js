const { help } = require("yargs")

const descripcion = {
    demand: true, //declara obligatoriedad
    alias: '-d', //valor a ingresar  en terminal 
    desc: 'Descripcion de la tarea por hacer'
};

const completado = {

    default: true, //valor por defecto
    alias: 'c', //valor a ingresar  en terminal 
    desc: 'marca como compleado o pendiente la tarea'
};

const argv = require('yargs')
    .command('crear', 'Crear un elemento por hacer', {
        descripcion,
        completado
    })
    .command('Actualizar', 'Actualiza el estado complado de una tarea', {
        descripcion,
        completado
    })

.command('borrar', 'borra alguna tarea', {
        descripcion
    })
    .help() // al llamar el metodo en terminal, nos da una ayuda de los comandos definidos anteriormente
    .argv;


module.exports = { //exportamos el archivo, para poder ser utilizado despues
    argv //valores a exportar
}