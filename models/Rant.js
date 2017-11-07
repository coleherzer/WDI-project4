const 
    mongoose = require('mongoose'),
    rantSchema = new mongoose.Schema({
        title: {type: String, required: true},
        category: {type: String, required: true},
        body: {type: String, required: true}, 
        public: {type: Boolean, default: true}, 
        commentsEnabled: {type: Boolean, default: true},
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        // have to go back and figure out how to add comments and likes
    }, {timestamps: true})

module.exports = mongoose.model('Rant', rantSchema)