//=============================REQUIRING CONSTANTS===========================//
const express = require('express');
const mongoose = require('mongoose');
const ogModel = require('./Model/Model')
const app = express();
const port = process.env.PORT || 3000;

//==============================ENABLING REQ.BODY============================//
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//======================CONNECTING TO DB AND LISTENING=======================//
const db = 'mongodb+srv://SteveStef:Stephens123456@node.q7wwn.mongodb.net/nodeBase4?\
retryWrites=true&w=majority'
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => {
  console.log('Successfully connected to the DB')
  app.listen(port, (req, res) => {
    console.log(`Listening for Requests on port ${port}...`);
  });
})
.catch((err) => console.log(err));
//================================MIDDLEWARE==================================//
//Setting up the view engine
app.set('view engine', 'ejs');
//=================================ALL ROUTES=================================//
//Redirecting to home
app.get('/', (req, res) =>{
  res.redirect('/home')
});

//Home route
app.get('/home', (req, res) => {
  res.render('index', { title: 'Welcome | ' })
});

//Results route
app.get('/results',(req,res)=>{
  infoArray = []
  ogModel.find()
  .then((result) => {
    res.render('results', { title: 'Welcome | ', infoArray: result })
  })
  .catch((err) => console.log(err));
});

//Users posting info to Results page
app.post('/home', (req, res) => {
  const userinfo = new ogModel({
    Name: req.body.name,
    MoneyPerHour: req.body.moneyPerHour,
    HoursPerWeek: req.body.hoursPerWeek,
    Single: req.body.single,
    //Dependent: req.body.dependent
  })
  userinfo.save()
  .then((result) => {
    res.redirect('/results')
  })
  .catch((err) => console.log(err));
});

//Routing to specific id
app.get('/results/:id', (req, res) => {
  const id = req.params.id
  ogModel.findById(id)
  .then((result) => {
    res.render('specificResults', {title: 'Welcome | ', idResult: result})
  })
  .catch((err) => console.log(err));
});
