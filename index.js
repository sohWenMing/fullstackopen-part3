const express = require('express');
const app = express();
const allRoutes = require('./routes/routes')
const persons = require('./src/persons')
const logger = require('./logging/logger')
const morgan =require('./logging/morgan')

const PORT = 3001;

app.use(express.json())
app.use(logger);
app.use(morgan);

app.use(allRoutes(persons, PORT));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
