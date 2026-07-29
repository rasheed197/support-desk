const mongoose = require('mongoose')

const feedbackSchema = mongoose.Schema({
    feedbackText: {
        type: String,
        maxLength: [500, 'Text cannot exceed 20 characters']
    }, 
    feedbackRating: {
        type: String,
        required: [true, 'Please select a rating'],
        enum: ['Very Bad', 'Bad', 'Okay', 'Good', 'Excellent'],
    }, 
    edited: {
        type: Boolean,
        default: false,
    }, 
},
{
    timestamps: true,
}
)

module.exports = mongoose.model('Feedback', feedbackSchema)
