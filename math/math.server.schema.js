'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var UserSchema = new Schema({
    firstname:String,
    lastname:String,
    profileImageURL:  String,
});
var User = mongoose.model('User', UserSchema);