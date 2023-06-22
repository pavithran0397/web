const express = require('express');
const config = require('./config');
const app =express();
app.listen(config.port,()=>console.log('listentin to port'));
app.use(express.static('public'))

app.get('/api/data', (req, res) => {
  const xlsx = require("xlsx");
const wb = xlsx.readFile("Book1.xlsx");
const ws = wb.Sheets["Sheet1"];
const data = xlsx.utils.sheet_to_json(ws);
// console.log(data);

  res.json(data);
});




