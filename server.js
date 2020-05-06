const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
	useNewUrlParser: true
}).then(() => {
    console.log("Conectado com o banco de dados");    
}).catch(err => {
    console.log('Erro ao conectar com o banco de dados', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Api ltp6."});
});

require('./app/routes/note.routes.js')(app);

// listen for requests
app.listen(3000, () => {
    console.log("Servidor sendo executado na porta 3000");
});