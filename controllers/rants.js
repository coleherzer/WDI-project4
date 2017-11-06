const Rant = require('../models/Rant.js')
//const signToken = require('../serverAuth.js').signToken

module.exports = {
	// list all rants
	index: (req, res) => {
		Rant.find({}, (err, rants) => {
			res.json(rants)
		})
	},

	// get one rant
	show: (req, res) => {
		//console.log("Current User:")
		console.log(req.rant)
		Rant.findById(req.params.id, (err, rant) => {
			res.json(rant)
		})
	},

	// create a new rant
	create: (req, res) => {
		Rant.create(req.body, (err, rant) => {
			if(err) return res.json({success: false, code: err.code})
			res.json({success: true, message: 'rant created', rant})
		})
	},

	// update a rant
	update: (req, res) => {
		Rant.findById(req.params.id, (err, rant) => {
			Object.assign(rant, req.body)
			rant.save((err, updatedRant) => {
				res.json({success: true, message: "Rant updated.", rant})
			})
		})
	},

	// delete a rant
	destroy: (req, res) => {
		Rant.findByIdAndRemove(req.params.id, (err, rant) => {
			res.json({success: true, message: "Rant deleted.", rant})
		})
	}
}