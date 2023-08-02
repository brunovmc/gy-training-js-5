const express = require('express');
const fs = require('fs');
const csvParser = require('csv-parser');

const app = express();
const port = 3000; 

const frequencyThreshold= 500000;
const frequencyThresholdString= '500000';

app.get('/read-csv-num-freq', (req, res) => {
    const nomes = [];

    fs.createReadStream('ibge-fem-10000 (3).csv')
    .pipe(csvParser({ separator: ',' })) 
    .on('data', (row) => {
        const freq = row.freq;
        if (freq >= frequencyThreshold) {
        nomes.push(row.nome);
        console.log(row.nome);
        }
    })
    .on('end', () => {
        res.send(nomes);
    });
});

app.get('/read-csv-string-freq', (req, res) => {
    const nomes = [];

    fs.createReadStream('ibge-fem-10000 (3).csv')
    .pipe(csvParser({ separator: ',' })) 
    .on('data', (row) => {
        const freq = row.freq;
        if (freq >= frequencyThresholdString) {
        nomes.push(row.nome);
        console.log(row.nome);
        }
    })
    .on('end', () => {
        res.send(nomes);
    });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
