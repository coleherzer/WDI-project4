const Rant = require('../models/Rant.js')

module.exports = {
    // create a new comment
	create: (req, res) => {
        console.log(req.body)
        const newCommentData = {...req.body, user: req.user._id}
        Rant.findById(req.params.id, (err, rant) => {
            rant.comments.push(newCommentData)
            rant.save((err, updatedRant) => {
                res.json({success: true, message: 'Comment added', rant: updatedRant})
            })
        })
    },
    destroy: (req, res) => {
        Rant.findById(req.params.rantId, (err, rant) => {
            var commentsList = rant.comments
            var index
            for(let i = 0; i < commentsList.length; i++) {
                if(commentsList[i]._id == req.params.commentId) {
                    index = i
                    break
                }
            }
            commentsList.splice(index, 1)
            rant.save((err, updatedRant) => {
                res.json({success: true, message: "Comment deleted", rant: updatedRant})
            })
        })
    },
    update: (req, res) => {
        Rant.findById(req.params.rantId, (err, rant) => {
            var comment = rant.comments.id(req.params.commentId)
            Object.assign(comment, req.body)
            rant.save((err, updatedRant) => {
                res.json({message: "comment updated", success: true, rant: updatedRant})
            })
        })
    }
}