var mysql = require('mysql')
var express = require('express')
var app = express()
var cors = require('cors');

app.use(cors({origin: 'http://localhost:3000'}));

var con = mysql.createConnection({
  host: "localhost",
  user: "top4ek",
  password: "q2w3e4r5",
  database: "adilbek"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM users", function (err, result, fields) {
    if (err) throw err;
    console.log('Connect to database is successful');
  });
});

app.get('/reg', (req, res) => {
  // пример запрос localhost:3000/reg?name=Никита&lesson=sql&type=студент
  var name = req.query.name
  var lesson = req.query.lesson
  var type = req.query.type
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  if(dd<10) {
      dd = '0'+dd
  }
  if(mm<10) {
      mm = '0'+mm
  }
  today = yyyy + '-' + mm + '-' + dd;
  var sql = "INSERT INTO users (name, lesson, type, date) VALUES ('"+name+"', '"+lesson+"', '"+type+"','"+today+"')";
  console.log(sql);
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("User recorded to database");
    res.send('New')
  });
})

app.get('/user_count', (req,res) => {
  // пример запрос localhost:3000/user_count?date=2018-07-18
  var date = req.query.date
  var sql = "SELECT name FROM users WHERE date = "+date+""
  con.query(sql, function (err, result, fields) {
      if (err) throw err;
      console.log(result[0].name);
      var count = 'count: '+result.length+''
      res.send(count)
  })
})

app.listen(3000, function(){
  console.log("Server listening on port 3000");
})
