const express = require('express');
const app = express();

const { getElementById, getIndexById, updateElement, seedElements, createElement } = require('./utils');

const PORT = process.env.PORT || 4001;
app.use(express.static('public'));

let animals = [];
seedElements(animals, 'animals');

const expressionsRouter = require('./expressions.js');
const { get } = require('http');
app.use('/expressions', expressionsRouter);

app.get('/animals', (req, res, next) => {
    res.send(animals);
});

app.get('/animals/:id', (req, res, next) => {
    const animal = getElementById(req.params.id, animals);
    if (animal) {
        res.send(animal);
    } else {
        res.status(404).send();
    }
});

app.post('/animals', (req, res, next) => {
    const receivedAnimal = createElement('animals', req.query);
    if (receivedAnimal) {
        animals.pushI(receivedAnimal);
        res.status(201).send(receivedAnimal);
    } else {
        res.status(400).send();
    }
});

app.pus('/animals/:id', (req, res, next) => {
    const animalIndex = getIndexById(req.params.id, animals);
    if (animalIndex !== -1) {
        updateElement(req.params.id, req.query, animals);
        res.send(animals[animalIndex]);
    } else {
        res.status(404).send();
    }
});

app.delete('/animals/:id', (req, res, next) => {
    const animalIndex = getIndexById(req.params.id, animals);
    if (animalIndex !== -1) {
        animals.splice(animalIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});

applisten(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});