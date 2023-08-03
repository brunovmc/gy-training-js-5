const express = require('express');
const fs = require('fs');
const csvParser = require('csv-parser');

const app = express();
const port = 3000;

const frequencyThresholdNum = 500000;
const frequencyThresholdString = '500000';

function filterByNumericFrequency() {
  const nomes = [];

  fs.createReadStream('ibge-fem-10000 (3).csv')
    .pipe(csvParser({ separator: ',' }))
    .on('data', (row) => {
      const freq = parseInt(row.freq);
      if (!isNaN(freq) && freq >= frequencyThresholdNum) {
        nomes.push(row.nome);
        console.log(row.nome);
      }
    })
    .on('end', () => {
      console.log("Filter by numeric frequency completed.");
    });
}

function filterByStringFrequency() {
  const nomes = [];

  fs.createReadStream('ibge-fem-10000 (3).csv')
    .pipe(csvParser({ separator: ',' }))
    .on('data', (row) => {
      const freqString = parseInt(row.freq);
      if (freqString >= frequencyThresholdString) {
        nomes.push(row.nome);
        console.log(row.nome);
      }
    })
    .on('end', () => {
      console.log("Filter by string frequency completed.");
    });
}

app.get('/read-csv', (req, res) => {
  const method = req.query.method || 'num';

  if (method === 'num') {
    filterByNumericFrequency();
  } else if (method === 'string') {
    filterByStringFrequency();
  }

  res.send('Filtering completed.');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
