const express = require('express');
const router = express.Router()
const bodyParser = require('body-parser');

const helper = require('../helper_functions/helpers')
const getFilteredPerson = helper.getFilteredPerson
const persons = require('../src/persons')

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended:true}))

function apiRoute(arg) {
    router.get('/persons', (req, res) => {
        res.json(arg);
    })
    return router;
}

function mainRoute(arg = null) {
    router.get('', (req, res) => {
        res.send(`getting something from port ${arg}`);
    })
    return router;
}

function infoRoute(arg) {
    router.get('', (req, res) => {
        console.log("arg into infoRoute:", arg)
        console.log("persons length: ", arg.persons.length);
        const dateTime = new Date();
        const dateTimeString = dateTime.toString();
        console.log(dateTimeString);
        res.send(`<h1>Phonebook has info for ${arg.persons.length} people</h1><br>${dateTimeString}`)   
    })
    router.get('/:id', (req, res) => {
        const result = getFilteredPerson(arg, req);
        if(result.isFound) {
            res.json(result.person);
        }
       else {
        res.status(404).end("Person could not be found");
       }       
    })
    return router;  
}

function deleteRoute(arg) {
   router.delete('/:id', (req, res) => {
    const {persons} = arg;
    const initialLength = persons.length;
    const result = getFilteredPerson(arg, req);
    if(result.isFound) {
        arg.persons = persons.filter(person => person.id !== Number(req.params.id))
        res.json(arg.persons);
    }
    else{
        res.status(404).end("Person was not found in the database with this id")
    }
})
    return router;
}

function addRoute(arg) {
    router.post('', (req, res) => {
        console.log("getting into addRoute");
        if(!req.body.name || !req.body.number) {
            res.status(404).end("mandatory information was not filled in")
            return
        }

        const filteredPersons = arg.persons.filter((person) => {
            return ( person.name.toLowerCase() === req.body.name.toLowerCase())
        })
        console.log("filteredPersons: ", filteredPersons);
        
        if(filteredPersons.length !== 0) {
            res.status(404).end("Person already exists in database");
            return
        }
        const newId = Math.floor(Math.random() * (1000000 - 100 + 1)) + 100;
        const personObject = {
            "id": newId,
            "name": req.body.name, 
            "number": req.body.number 
        }
        console.log(personObject);
        arg.persons = [...arg.persons, personObject];
        res.json(arg.persons);
        

    })
    return router;
}

    

module.exports = {apiRoute, mainRoute, infoRoute, deleteRoute, addRoute}