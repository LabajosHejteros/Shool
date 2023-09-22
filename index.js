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
 
  
    res.render("users",{results});
 
  })
})
app.get('/deleteallusers', (req, res) => {
 
  //dotaz na SQL
  connection.query('SELECT * FROM labajos', (error, results, fields) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(results);
 
  
    res.render("deleteallusers",{results});
 
  })
})
  
app.post('/deleteallusers', (req, res) => {

  let sql = 'DELETE FROM labajos WHERE id<1000;';
  connection.query(sql, (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Chyba při mazání uživatelů');
      return;
    }
    console.log("Všichni uživatelé byli smazáni");
    
    // Zde můžete provést další kroky po smazání uživatelů

    res.redirect('/users'); // Přesměrování na stránku s uživateli nebo jinou cílovou stránku
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
  var sql = `INSERT INTO rozvrh (Ucitel, Trida, Predmet) VALUES ('${request.body.Ucitel}','${request.body.Trida}','${request.body.Predmet}')`;
 
  connection.query(sql, (error, results, fields) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(results);
  })
  response.send(`Nový rozvrh byl vytvořen`)
  
})
app.get('/update', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'rozvrh'))
})
//smazání zápisu
app.post('/update', function (request, respone, next) {
  var sql = `UPDATE rozvrh SET Predmet = '${request.body.Ucitel}', teacher ='${request.body.Trida}', classroom = '${request.body.Predmet}', budova ='${request.body.budova}', day ='${request.body.day}', hour ='${request.body.hour}', abb ='${request.body.abb}' WHERE id = ${request.body.id}`
  connection.query(sql, (error, results, fields) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(results);
  })

  respone.sendFile(path.join(__dirname, 'views', 'rozvrh'));

})
      
 
app.listen(port, () => {

  console.log(`Example app listening on port ${port}`)
})


//git add -A
//git commit -m "kozleroshejteros"
//git push -u origin main