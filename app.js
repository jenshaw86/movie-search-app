const express = require('express');
const app = express();
const rp = require('request-promise');
const bodyParser = require('body-parser');
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.render('search')
})

app.get('/results', (req, res) => {
  const title = req.query.title;
  rp(`http://www.omdbapi.com/?s=${title}&apikey=thewdb`)
  .then(body => {
    const data = JSON.parse(body).Search
    res.render('results', {data: data})
  })
  .catch(err => console.log(err))
})

app.listen(port, () => console.log(`listening on port ${port}`))