const express = require('express');
const app = express();
const getRoutes = require('./routes/getRoutes')
const persons = require('./src/persons')
console.log("persons: ", persons);

const PORT = 3001;

app.delete('/api', getRoutes.deleteRoute(persons));
app.post('/api', getRoutes.addRoute(persons));
app.use('/api', getRoutes.apiRoute(persons));
app.use('/info', getRoutes.infoRoute(persons));
app.use('/', getRoutes.mainRoute(PORT));



app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
