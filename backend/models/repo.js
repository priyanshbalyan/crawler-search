const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Repo = new Schema({
    title: { type: String, required: true, unique: true },
    link: {type: String, required:true, unique: true},
    description: { type: String },
    language: { type: String },
    stars: { type: String },
    tags: [{type: String}]
})

module.exports = mongoose.model('Repo', Repo);