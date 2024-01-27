const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const User = new Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type: String,
            required: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw Error('Not a valit email');
                }
            }
        },
        password: {
            type: String,
            required: true
        },
        createdAt:{
            type:Date,
            default: Date.now()
        },
        updatedAt:{
            type:Date,
            default: Date.now()
        }
    }
)
module.exports = mongoose.model('Users', User);