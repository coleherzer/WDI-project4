const 
    mongoose = require('mongoose'),
    commentSchema = new mongoose.Schema({
        body: {type: String},
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    }, {timestamps: true}),
    rantSchema = new mongoose.Schema({
        title: {type: String, required: true},
        category: {type: String, required: true},
        body: {type: String, required: true}, 
        public: {type: Boolean, default: true}, 
        commentsEnabled: {type: Boolean, default: true},
        likes: {type: Number, default: 0},
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        // have to go back and figure out how to add comments and likes
        comments: [commentSchema]
    }, {timestamps: true})

module.exports = mongoose.model('Rant', rantSchema)