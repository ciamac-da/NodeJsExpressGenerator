
// Express-Bibliothek importieren
var express = require('express');


// Pseudo-DB-Bibliothek importieren
var { DataStore } = require('notarealdb');

// Server erstellen
var app = express();

//Pseudo-DB erstellen
var store = new DataStore('./data');

// Collection füe die Tiere
var animals = store.collection('animals')

// Neue Tiere hinzufügen
animals.create({type: 'bear', name:'Dingo'})

// Array mit allen Tieren
// var animals = [{type:'bear' , name: 'Dingo'}, {type:'cat', name:'Martin'}]

// Parsen des Bodys in POST aktivieren
// ba methode urlencoded faghat chizaye aslio migirim o string o { ro hazf mikone}
app.use(express.json())
app.use(express.urlencoded({ extended: false}));

// URL  für startseite festlegen
app.get('/',(req,res) =>{
     // res.send('<form method="POST" action="/animals"> <input type="text" name="type"> <input type="submit" value="Senden"> </form>')
      res.send('<form method="DELETE" action="/animals"> <input type="text" name="type"> <input type="submit" value="Senden"> </form>')
      

})
app.get('/animals', (req,res)=>{
    //  res.json([{type: 'Dog', name:'Wuffi'}, {type: 'Cat', name:'Whis'}])
res.json(animals)
})

// post muss geparst werden
app.post('/animals', (req,res) =>{
var data = req.body
// neues Tier in die DB hinzufügen
//animals.create(data)
//Alles aus der DB-Collection ausgeben 
res.json(animals.list())
})

// delete
app.delete('/animals/:animalId', ( req, res) =>{
      var animalId =  req.params.animalId
      console.log("delete" + animalId)
      
      // Einen Eintrag aus DB löschen
      animals.delete(animalId)
      res.json(animals.list())
})

app.put('/animals/:animalId', (req,res)=>{
      var animalId = parseInt(req.params.animalId)
      [animalId] = req.body
      res.json(animals)
})

module.exports = app;