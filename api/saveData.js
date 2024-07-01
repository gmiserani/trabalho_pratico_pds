const fs = require('fs');
const path = require('path');

const data = {
  simulador1: JSON.parse(fs.readFileSync(path.join(__dirname, 'simulador1Data.json'), 'utf8')),
  simulador2: JSON.parse(fs.readFileSync(path.join(__dirname, 'simulador2Data.json'), 'utf8')),
  simulador3: JSON.parse(fs.readFileSync(path.join(__dirname, 'simulador3Data.json'), 'utf8')),
  simulador4: JSON.parse(fs.readFileSync(path.join(__dirname, 'simulador4Data.json'), 'utf8'))
};

fs.writeFileSync(path.join(__dirname, 'combinedData.json'), JSON.stringify(data, null, 2), 'utf8');
console.log('Data has been saved to combinedData.json');
