const express = require('express');
const router = express.Router()


const helper = require('../helper_functions/helpers')
const getFilteredPerson = helper.getFilteredPerson
const persons = require('../src/persons')


function allRoutes(personsJson, port) {
    
    router.get('/', (req, res) => {
        res.send(`getting something from port ${port}`)
        console.log("In main route ")
    })

    router.get('/api/persons', (req, res) => {
        res.json(personsJson)
        console.log("in /api/persons")
    })

    router.get('/info/:id', (req, res) => {
        const result = getFilteredPerson(personsJson, req);
        if(result.isFound) {
            res.json(result.person);
        }
       else {
        res.status(404).end("Person could not be found");
       }       
    })

    router.get('/info', (req, res) => {
        const dateTime = new Date();
        const dateTimeString = dateTime.toString();
        res.send(`<h1>Phonebook has info for ${personsJson.persons.length} people</h1><br>${dateTimeString}`)   
    })

    router.post('/api', (req, res) => {
        console.log("getting into addRoute");
        if(!req.body.name || !req.body.number) {
            res.status(404).send("mandatory information was not filled in")
            return
        }

        const filteredPersons = personsJson.persons.filter((person) => {
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
        personsJson.persons = [...personsJson.persons, personObject];
        res.json(personsJson.persons);
    })
    router.delete('/api/:id', (req, res) => {
        const {persons} = personsJson;
        console.log(persons);
        const initialLength = persons.length;
        const result = getFilteredPerson(personsJson, req);
        if(result.isFound) {
            personsJson.persons = persons.filter(person => person.id !== Number(req.params.id))
            res.json(personsJson.persons);
    }
    else{
        res.status(404).end("Person was not found in the database with this id")
    }
    })
    router.use("*", (req, res) => {
        res.status(404).end("Here's your fucking error message");
    })
    
    return router;
}

module.exports = allRoutes;