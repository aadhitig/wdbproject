import express from 'express';
const app = express();
app.use(express.json())
import fetch from 'node-fetch';

let newCats = []
let newVeges = []
let deletedVeges = []

app.get('/', async function (req, res) {
    
    async function getData(url) {
        const response = await fetch(url);
        return response.json();
      }
    
    const cats = await getData('http://cats-in-the-sky.herokuapp.com/api/cats');
    const veges = await getData('http://cats-in-the-sky.herokuapp.com/api/veges');

    let Matchings = {};
    
    for (let i = 0; i < cats.length; i++) {
        let veggies = [];
        let catLetter = cats[i].charAt(0);
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
        Matchings[cats[i]] = veggies;
    }
    
    res.send(Matchings);
  })

app.post('/', function (req, res) {
    if (req.body.cat) {
        newCats.push(req.body.cat);
        res.send("POST Complete")
        return
    }
    else if (req.body.vege) {
        newVeges.push(req.body.vege);
        res.send("POST Complete")
        return
    }
  })

app.delete('/', async function (req, res) {
    async function getData(url) {
        const response = await fetch(url);
        return response.json();
      }
    const veges = await getData('http://cats-in-the-sky.herokuapp.com/api/veges');
    
    if (newVeges.includes(req.body.vege[0])) {
        newVeges = newVeges - req.body.vege
    }
    else if (veges.includes(req.body.vege[0])) {
        deletedVeges.push(req.body.vege[0])
    }
    res.send("Delete Complete")
  })

app.listen(3000, function() {
    console.log("Server is running on localhost3000");
})