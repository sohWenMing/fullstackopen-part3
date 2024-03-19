function getFilteredPerson(arg, req) {
    const persons = arg.persons;
    const filteredPerson = persons.filter((person) => {
        return (
            person.id === Number(req.params.id)
        )
    })
    const result = {
        person: filteredPerson.length === 0 ? null : filteredPerson[0],
        isFound: filteredPerson.length !== 0
    }
    return result
}

module.exports = {
    getFilteredPerson
}