'use strict';

const uuid = require('uuid/v4');

const schema = {
  id: {required: true},
  name: {required: true},
  type: {required: true},

};

class Products {

  constructor() {
    this.database = [];
  }

  get(id) {
    let response = id ? this.database.filter( record => record.id === id) : this.database;
    return Promise.resolve(response);
  }
  
  post(entry) {
    entry.id = uuid();
    let record = this.sanitize(entry);
    if(record.id) {
      this.database.push(record);
    }
    return Promise.resolve(record);
  }

  put(_id, entry) {
    _id = entry._id;
    let newRecord = this.sanitize(entry);
    for(let i in this.database) {
      if(_id === this.database.entry[i]['_id']) {
        this.database[i] = newRecord;
      }
    }
    return Promise.resolve(newRecord);
  }

  delete(id) {
    // let id = parseInt(req.params.id);
    this.database = this.database.filter( (record,idx) => record.id !== id);
    return Promise.resolve({});
  }

  sanitize(data) {
    let valid = true;
    let record = {};

    for (let key in schema) {
      if(schema[key].required) {
        if(data[key]) {
          record[key] = data[key];
        } else {
          valid = false;
        }
      } else {
        record[key] = data[key];
      }
    }
    return valid ? record : undefined;
  }
}

module.exports = Products;