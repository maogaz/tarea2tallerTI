const { Router } = require('express');
const router = Router();

const _ = require('underscore');

const hamburgers = require('../sample2.json');


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
    res.status(404).send('Ingrediente inexistente');

});


router.post('/', (req, res) => {
    const { nombre, descripcion}= req.body;
    if (nombre && descripcion){
        const id = hamburgers.length + 1;
        const newHamburger = {id, ...req.body,};
        hamburgers.push(newHamburger);
        res.status(201).send(newHamburger);

    } else {
        res.status(400).send('Input invalido');
    }
});

router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion} = req.body;
    if (nombre && descripcion) {
        _.each(hamburgers, (hamburger, i) => {
            if (hamburger.id == id) {
                hamburger.nombre = nombre;
                hamburger.descripcion = descripcion;
                res.status(200).send('Operacion exitosa');
            }
        });
        //res.status(200).send('Operacion exitosa');

    } else {
        res.status(400).send('Paramentros invalidos');
    }
    res.status(404).send('Ingrediente inexistente');
});


router.delete('/:id', (req, res) => {
    const { id } = req.params;
    _.each(hamburgers, (hamburger,i) => {
        if (hamburger.id == id) {
            hamburgers.splice(i,1);
            res.status(200).send('Ingrediente eliminado');
        }
        else {
            res.status(404).send('Ingrediente inexistente');
        }
    });
    //res.status(200).send('Hamburguesa eliminada');
});


module.exports = router;
