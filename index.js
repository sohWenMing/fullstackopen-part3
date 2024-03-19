const express = require('express');
const app = express();
const getRoutes = require('./routes/getRoutes')

const PORT = 3001;

app.use("", getRoutes);
app.listen(PORT), () => {
    console.log(`Server listening on port ${PORT}`);
};
