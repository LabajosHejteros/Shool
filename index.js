const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false}));

var path = require('path');

const ejs = require('ejs');//šablonovací knihovna
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const mysql = require('mysql2');
const { error } = require('console');

const connection = mysql.createConnection({
  host: '192.168.1.161',
  user: 'filip.labaj',
  password: 'Labajos77',
  database: 'filip.labaj',
  port: 3001
})

app.get('/index', (req, res) => {

  res.render("index",{res})
})

  
app.get('/rozvrh', (req, res) => {
 
  //dotaz na SQL
  connection.query('SELECT * FROM rozvrh', (error, results, fields) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(results);
    res.render("rozvrh",{results})
  })
})


  
 

  



//ROUTA USERS
app.get('/users', (req, res) => {
 
  //dotaz na SQL
  connection.query('SELECT * FROM labajos', (error, results, fields) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(results);
 
    // let tableRows = `<tr><td>ID</td><td>Jméno</td><td>Příjmení</td><td>Bydliště</td></tr>`;
 
    // results.forEach(user => {
 
      // tableRows += `<tr><td style="border: 1px solid black">${user.ID}</td><td style="border: 1px solid black">${user.Jméno}</td><td style="border: 1px solid black">${user.Příjmení}</td><td style="border: 1px solid black">${user.Bydliště}</td></tr>`;
 
    // });
 
    // const table = `<table>${tableRows}</table>`;
    // console.log(table)
    // res.send(table);
    res.render("users",{results});
 
  })
})
  
app.post('/deleteallusers', (req, res) => {

  let sql = `DELETE FROM users`;
  connection.query(sql,(error, results, fields) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(results)
    console.log("Všichni uživatelé byli smazáni")

    res.render('users', {results});
  })
})
    


//ROUTA NEWUSERS
app.get('/newusers', (req, res) => {

  res.render("newusers",{res})
})      
app.post('/newusers', function (request, response, next) {
 
  // SQL dotaz pro vložení dat do databáze
  var sql = `INSERT INTO labajos (Jméno, Příjmení, Bydliště) VALUES ('${request.body.Jméno}','${request.body.Příjmení}','${request.body.Bydliště}')`;
 
  connection.query(sql, (error, results, fields) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(results);
  })
  response.send(`Uživatele byli vloženi do DB`)
  
})
app.get('/newrozvrh', (req, res) => {

  res.render("newrozvrh",{res})
})      
app.post('/newrozvrh', function (request, response, next) {
 
  // SQL dotaz pro vložení dat do databáze
  var sql = `INSERT INTO rozvrh (Ucitel, Trida, Predme
    
    t) VALUES ('${request.body.Ucitel}','${request.body.Trida}','${request.body.Predmet}')`;
 
  connection.query(sql, (error, results, fields) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(results);
  })
  response.send(`Nový rozvrh byl vytvořen`)
  
})
      
 
app.listen(port, () => {

  console.log(`Example app listening on port ${port}`)
})
