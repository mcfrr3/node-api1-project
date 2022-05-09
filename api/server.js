// BUILD YOUR SERVER HERE
const express = require('express');
const Users = require("./users/model");

const server = express();

server.use(express.json());

server.post('/api/users', (req, res) => {
  console.log("req.body: ", req.body);
  const { name, bio } = req.body;
  console.log(name, bio);
  if (!name || !bio) {
    res.status(400).json({ message: "Please provide name and bio for the user"});
  } else {
    Users.insert(req.body)
      .then(result => {
        res.status(201).json(result)
      })
      .catch(err => {
        res.status(500).json({ message: "There was an error while saving the user to the database" });
      });
  }
});

server.get('/api/users', (req, res) => {
  Users.find()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({ message: "The users information could not be retrieved"});
    })
})

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  Users.findById(id)
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        res.status(404).json({ message: "The user with the specified ID does not exist"});
      }
      console.log(result);
    })
    .catch(err => {
      res.status(500).json({ message: "The user information could not be retrieved"});
    })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
