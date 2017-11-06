const
    express = require('express'),
    rantsRouter = new express.Router(),
    rantsCtrl = require('../controllers/rants.js')
    // verifyToken = require('../serverAuth.js').verifyToken

rantsRouter.route('/')
    .get(rantsCtrl.index)
    .post(rantsCtrl.create)

rantsRouter.route('/:id')
    .get(rantsCtrl.show)
    .patch(rantsCtrl.update)
    .delete(rantsCtrl.destroy)

module.exports = rantsRouter

