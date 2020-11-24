const fs = require('fs');
const colors = require('colors');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });
}

// Leer el archivo json y retornarlo al data
const cargarDB = () => {
    // Para manejar el error en caso de que la data.json este vacia
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }


}

const crear = (descripcion) => {
    //* Para que crear siempre registre todo lo nuevo en la db

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    // push del objeto dentro del listado por hacer
    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;

}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();

    // Buscar en el arreglo de listadoPorHacer la tarea que coincida con la descripción
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

    //! La función filter nos permite quitar o filtrar algun elemento deseado y regresa un
    //! nuevo arreglo
    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
    }

}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}