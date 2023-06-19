function hero() {
  const xlsx = require("xlsx");
  const wb = xlsx.readFile("Book1.xlsx");
  const ws = wb.Sheets["Sheet1"];
  const data = xlsx.utils.sheet_to_json(ws);
  const dataArray = [...data];
}
