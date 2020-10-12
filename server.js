const express = require('express');
const app = express();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) );

server.listen(process.env.PORT || 4200, function(){
    console.log("Server connected. Listening on port: " + (process.env.PORT || 4200));
});

app.all("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
  });

app.use(express.static(__dirname + '/dist'));

app.get('/getBooksList', function(req, res){ 
  fs.readFile('src/assets/mockData/booksList.json', (err, data) => {
    if (err) throw err;
    return res.send(JSON.parse(data));
  });
});

app.get('/clearCart', function(req, res){ 
  fs.readFile('src/assets/mockData/cartList.json', (err, data) => {
    if (err) throw err;
    fs.writeFileSync('src/assets/mockData/cartList.json', JSON.stringify({cartList: []}));
    fs.readFile('src/assets/mockData/booksListBackUp.json', function (err, data) {
      if (err) throw err;
      let json = JSON.parse(data);
      fs.writeFileSync('src/assets/mockData/booksList.json', JSON.stringify(json));
      return res.send({cartCleared: true});
    });
  });
});

app.get('/getCartList', function(req, res){ 
  fs.readFile('src/assets/mockData/cartList.json', (err, data) => {
    if (err) throw err;
    return res.send(JSON.parse(data));
  });
});

app.post('/addBookToCart', function(req, res){ 
  fs.readFile('src/assets/mockData/cartList.json', function (err, data) {
    if (err) throw err;
    let json = JSON.parse(data);
    json.cartList.push({no: json.cartList.length + 1, refID: req.body.refID, title: req.body.title, author: req.body.author, edition: 2001});
    fs.writeFileSync('src/assets/mockData/cartList.json', JSON.stringify(json));
    fs.readFile('src/assets/mockData/booksList.json', function (err, data) {
      if (err) throw err;
      let json = JSON.parse(data);
      const ind = json.booksList.findIndex(b => b.refID === req.body.refID);
      json.booksList[ind].status = 'Unavailable';
      fs.writeFileSync('src/assets/mockData/booksList.json', JSON.stringify(json));
      return res.send({added: true})
    });
  });
});
 
app.post('/removeBookFromCart', function(req,res){ 
  fs.readFile('src/assets/mockData/cartList.json', function (err, data) {
    if (err) throw err;
    let json = JSON.parse(data);
    json.cartList.splice(json.cartList.findIndex(j => j.refID === req.body.refID), 1);
    fs.writeFileSync('src/assets/mockData/cartList.json', JSON.stringify(json));
    fs.readFile('src/assets/mockData/booksList.json', function (err, data) {
      if (err) throw err;
      let json = JSON.parse(data);
      const ind = json.booksList.findIndex(b => b.refID === req.body.refID);
      json.booksList[ind].status = 'Available';
      fs.writeFileSync('src/assets/mockData/booksList.json', JSON.stringify(json));
      return res.send({removed: true})
    });
  });
});
 
app.post('/removeBookFromStore', function(req,res){ 
  fs.readFile('src/assets/mockData/booksList.json', function (err, data) {
    if (err) throw err;
    let json = JSON.parse(data);
    json.booksList.splice(json.booksList.findIndex(j => j.refID === req.body.refID), 1);
    fs.writeFileSync('src/assets/mockData/booksList.json', JSON.stringify(json));
    return res.send({removed: true})
  });
});

app.post('/addBookToStore', function(req, res){ 
  fs.readFile('src/assets/mockData/booksList.json', function (err, data) {
    if (err) throw err;
    let json = JSON.parse(data);
    const ind = json.booksList.findIndex(b => b.refID === req.body.refID);
    if(ind === -1){
      json.booksList.push({no: json.booksList.length + 1, refID: req.body.refID, title: req.body.title, author: req.body.author, edition: req.body.edition, status: 'Available'});
      fs.writeFileSync('src/assets/mockData/booksList.json', JSON.stringify(json));
      return res.send({added: true});
    }
    else{
      return res.send({added: false});
    }
  });
});

app.get('/resetBooksList', function(req, res){ 
  fs.readFile('src/assets/mockData/booksListBackUp.json', function (err, data) {
    if (err) throw err;
    let json = JSON.parse(data);
    fs.writeFileSync('src/assets/mockData/booksList.json', JSON.stringify(json));
    return res.send({reset: true})
  });
});