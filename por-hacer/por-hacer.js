const fs = require('fs'); //se requiere para guardar el contenido en alguna carpeta
const { CLIENT_RENEG_LIMIT } = require('tls');


let listadoPorHacer = [];


const guardarDB = () => { // metodo para hacer persistente el programa, es decir ir guardando la info en una base de datos

    let data = JSON.stringify(listadoPorHacer); //este metodo nos permite convertir un arreglo en un formato JSON valido

    fs.writeFile('por-hacer/db/data.json', data, (err) => {

        if (err) throw new Error('no se pudo guardar ', );
    });

}


const cargarDB = () => { //cargar info en el  archivo

    try { // esta es la forma de definir el error, si estuviese vacio el archivo 
        //creamos un arreglo vacio asi no da error
        listadoPorHacer = require('./db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }


}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}


const crear = (descripcion) => {

    cargarDB(); //cargamos la base de datos

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer); //carga los valores en el arreglo

    guardarDB();

    return porHacer;
}

const actualizar = (descripcion, completado = true) => {

    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {

    cargarDB();
    let nuevoListado = listadoPorHacer.filter(tarea => { // con este metodo filtramos elcontenido para verificar si existe un elemento  

        return tarea.descripcion != descripcion
    });

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}