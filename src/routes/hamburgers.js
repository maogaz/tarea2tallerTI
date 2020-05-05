const { Router } = require('express');
const router = Router();

const _ = require('underscore');

const hamburgers = require('../sample.json');


router.get('/', (req, res) => {
    res.status(200).json(hamburgers);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    _.each(hamburgers, (hamburger,i) => {
        if (hamburger.id == id) {
            res.status(200).send(hamburger);
        }
    });
    res.status(404).send('Hamburguesa inexistente');

});


router.post('/', (req, res) => {
    const { nombre, precio, descripcion, imagen}= req.body;
    const ingredientes = [{}];
    if (nombre && precio && descripcion && imagen){
        const id = hamburgers.length + 1;
        const newHamburger = {id, ...req.body, ingredientes};
        hamburgers.push(newHamburger);
        res.json(newHamburger);

    } else {
        res.status(400).send('Input invalido');
    }
});

router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, precio, descripcion, imagen} = req.body;
    if (nombre && precio && descripcion && imagen) {
        _.each(hamburgers, (hamburger, i) => {
            if (hamburger.id == id) {
                hamburger.nombre = nombre;
                hamburger.precio = precio;
                hamburger.descripcion = descripcion;
                hamburger.imagen = imagen;
                res.status(200).send('Operacion exitosa');
            }
        });
        //res.status(200).send('Operacion exitosa');

    } else {
        res.status(400).send('Paramentros invalidos');
    }
    res.status(404).send('Hamburguesa inexistente');
});


router.delete('/:id', (req, res) => {
    const { id } = req.params;
    _.each(hamburgers, (hamburger,i) => {
        if (hamburger.id == id) {
            hamburgers.splice(i,1);
            res.status(200).send('Hamburguesa eliminada');
        }
        else {
            res.status(404).send('Hamburguesa inexistente');
        }
    });
    //res.status(200).send('Hamburguesa eliminada');
});


module.exports = router;
