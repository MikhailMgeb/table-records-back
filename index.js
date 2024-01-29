const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const port = 3000;
const byField = require('./function');

app.use(cors());
app.use(bodyParser.json());

app.post('/create-player', (req, res) => {
    const newPlayer = req.body;
    const database = fs.readFileSync(path.join(__dirname, 'record-database.json'), 'utf-8');
    const databaseObject = JSON.parse(database);

    if (Object.keys(newPlayer).length !== 0) {
        databaseObject.push(newPlayer);
    }

    databaseObject.sort(byField('points'));

    if (databaseObject.length > 9) {
        databaseObject.pop();
    }

    fs.writeFileSync(path.join(__dirname, 'record-database.json'), JSON.stringify(databaseObject, null, 2), 'utf-8');
})

app.get('/list', (req, res) => {
    res.sendFile(__dirname + '/record-database.json');
})

app.listen(port, () => {
    console.log(`Приложение запущено и слушает порт ${port}`);
})
