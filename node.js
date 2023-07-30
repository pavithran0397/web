const express = require('express');
const bodyParser = require('body-parser');
const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs').promises;
const xlsx = require('xlsx');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// API endpoint to serve data from Book1.xlsx
app.get('/api/data', (req, res) => {
  const wb = xlsx.readFile('Book1.xlsx');
  const ws = wb.Sheets['Sheet1'];
  const data = xlsx.utils.sheet_to_json(ws);
  res.json(data);
});

// API endpoint to generate PDF from form data
app.post('/generate-pdf', async (req, res) => {
  try {
    const formFields = req.body;

    // Generate the PDF
    const pdfDoc = await generatePDF(formFields);

    // Save the PDF to a file
    const pdfBytes = await pdfDoc.save();

    // Set the response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=form.pdf');

    // Send the PDF as a response
    res.send(pdfBytes);
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
});

async function generatePDF(formFields) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([400, 400]);

  const { width, height } = page.getSize();

  // Add the form fields to the PDF
  const form = pdfDoc.getForm();
  form.drawText(formFields.name, {
    x: 50,
    y: height - 100,
    size: 20,
    color: rgb(0, 0, 0),
  });

  // Add more form fields as needed

  return pdfDoc;
}

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});





