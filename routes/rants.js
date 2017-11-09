const
    express = require('express'),
    rantsRouter = new express.Router(),
    rantsCtrl = require('../controllers/rants.js'),
    commentsCtrl = require('../controllers/comments.js'),
    verifyToken = require('../serverAuth.js').verifyToken

// Right now, you have it set up where you need
// to have the token verfied to do anything

rantsRouter.route('/')
    .get(rantsCtrl.index)

rantsRouter.use(verifyToken)

rantsRouter.route('/')
    .post(rantsCtrl.create)

rantsRouter.route('/:id')
    .get(rantsCtrl.show)
    .patch(rantsCtrl.update)
    .delete(rantsCtrl.destroy)

rantsRouter.route('/:id/comments')
    .post(commentsCtrl.create)

rantsRouter.route('/:rantId/comments/:commentId')
    .delete(commentsCtrl.destroy)
    .patch(commentsCtrl.update)

module.exports = rantsRouter

