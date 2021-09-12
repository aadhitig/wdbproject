import express from 'express';
var app = express();
import fetch from 'node-fetch';

var newCats = []
var newVeges = []
var deletedVeges = []

app.get('/', function (req, res) {

    fetch('http://cats-in-the-sky.herokuapp.com/api/catss')
    .then(res => res.json())
    .then(json => {
        console.log(json)
    })
    Matchings = {};
    for (let i = 0; i < cats.length; i++) {
        veggies = [];
        catLetter = cat[i].charAt(0);
        // veggies are from API
        for (let i = 0; i < veges.length; i++) {
            if (veges[i].startsWith(catLetter) && !deletedVeges.includes(veges[i])) {
                veggies.push(veges[i]);
            }
        }
        for (let i = 0; i < newVeges.length; i++) {
            if (newVeges[i].startsWith(catLetter)) {
                veggies.push(veges[i]);
            }
        }
        Matchings[cat[i]] = veggies;
    }
    return Matchings;
  })


// post request body
// request is our temporary name
app.post('/', function (req, res) {
    if (res.keys()[0].equals("cat")) {
        newCats.push(res[res.keys()[0]]);
    }
    else if (res.keys()[0].equals("vege")) {
        newVeges.push(res[res.keys()[0]]);
    }
  })

// delete request body
app.delete('/user', function (req, res) {
    if (newVeggies.includes(res.vege)) {
        const index = newVeggies.indexOf(res.vege);
        newVeges.splice(index, 1)
    }
    else if (true/* new veggies in get request to api veges */) {
        deletedVeges.push(res.vege)
    }
  })

app.listen(3000, function() {
    console.log("Server is running on localhost3000");
})