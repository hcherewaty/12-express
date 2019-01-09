'use strict';

const express = require('express');
const uuid = require('uuid');

const app = express();

const PORT = process.env.PORT || 8080;

let db = [];

app.use(express.json());

app.use( (req,res,next) => {
  console.log('LOG:', req.method, req.path);
  next();
});

app.get('/posts', (req,res,next) => {
  let count = db.length;
  let results = db;
  res.json({count,results});
});

app.get('/posts/:id', (req,res,next) => {
  let id = req.params.id;
  let record = db.filter((record) => record.id === parseInt(id));
  res.json(record[0]);
});


app.post('/posts', (req,res,next) => {
  let {name,author,title,article,id} = req.body;
  // let record = {name,author,title,article,id};
  let newRecord = new RecordFormatter(name, author, title, article, uuid());
  console.log(newRecord);
  // newRecord.id = uuid();
  db.push(newRecord);
  res.json(newRecord);
});

app.put('/posts/:id', (req,res,next) => {
  let id = req.params.id;
  let {name,author,title,article} = req.body;
  let update = {name,author,title,article};
  db = db.map( (record) => (record.id === parseInt(id)) ? update: record );
  res.json(update);
});

app.delete('/posts/:id', (req,res,next) => {
  console.log('delete me!');
  let id = parseInt(req.params.id);
  db = db.filter( (record,idx) => record.id !== id );
  res.json({});
});

class RecordFormatter {
  constructor(name, author, title, article, id) {
    this.name = name,
    this.author = author,
    this.title = title,
    this.article = article,
    this.id = id;
  }
}

module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 8080;
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  },
};

