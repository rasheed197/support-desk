const mongoose = require('mongoose')

// Define a schema for a "User" document
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
    }, 
    password: {
        type: String,
        required: [true, 'Please add a password'],
    }, 
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }, 
},
{
    timestamps: true,
}
)

// Create a model based on the schema
module.exports = mongoose.model('User', userSchema)
