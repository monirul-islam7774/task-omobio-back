const User = require('../../model/userModel');

// register user
exports.createUser = function (req, res) {
    let body = req.body
    let data = new User(body)
    // todo check if the email already exists
    User.findOne({
        email: body.email
    }).then(doc => {
        if (doc === null) {
            data.save().then(doc => {
                res.send({
                    data: doc
                })
            })
            .catch(err => {
                console.error(err)
            })
           
        } else {
            res.status(404).send({
                message: "Email Already Exists"
            });
        }
    })
   
}

// login user
exports.getUser = function (req, res) {
    let body = req.body
    User.findOne({
        email: body.email
    }).then(doc => {
        if (doc === null) {
            res.status(404).send({
                message: "Wrong Password or Email"
            });
        } else {
            // check for password
            if (doc.password != body.password) {
                res.status(404).send({
                    message: "Wrong Password or Email"
                });
            } else {
                res.status(200).send({
                    data: doc
                })
            }
        }
    })
}

// get all user check by role
exports.getAllUser = function (req, res) {
    User.find({role: 'user'}).then(doc => {
        res.status(200).send({
            data: doc
        })
    })
}

// login for admin
exports.getAdmin = function (req, res) {
    let body = req.body
    User.findOne({
        email: body.email
    }).then(doc => {
        if (doc === null) {
            res.status(404).send({
                message: "Wrong Password or Email"
            });
        } else {
            // check for password
            if (doc.password != body.password) {
                res.status(404).send({
                    message: "Wrong Password or Email"
                });
            } else {
                res.status(200).send({
                    data: doc
                })
            }
        }
    })
}

