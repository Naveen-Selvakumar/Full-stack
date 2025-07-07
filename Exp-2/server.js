const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
let formData = {};


const { engine } = require('express-handlebars');
app.engine('hbs', engine({ extname: '.hbs', layoutsDir: false }));
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/', (req, res) => {
  formData = {}; // Reset form data on fresh start
  res.render('form1', { layout: false });
});


app.post('/form2', (req, res) => {
  formData = { ...formData, ...req.body };
  res.render('form2', { layout: false });
});


app.post('/form3', (req, res) => {
  formData = { ...formData, ...req.body };
  res.render('form3', { layout: false });
});


app.post('/submit', (req, res) => {
  formData = { ...formData, ...req.body };

  fs.writeFileSync('data.json', JSON.stringify(formData, null, 2));
  res.redirect('/result');
});
app.get('/result', (req, res) => {
  const data = JSON.parse(fs.readFileSync('data.json'));
  res.render('result', { ...data, layout: false });
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
