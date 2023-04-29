const { Router } = require("express")
const { jwt } = require("jsonwebtoken")
const { bcrypt } = require("bcrypt")
require("dotenv").config()


const { userModel } = require("../model/userModel")

const user = Router()


user.post("/login", async (req, res) => {
    try {
        let { email, password } = req.body;
        let data = userModel.find({ email })
        if (data.length > 0) {
            bcrypt.compare(password, data[0].password, function (err, result) {
                if (result) {
                    const token = jwt.sign({ userID: data[0]._id }, process.env.secretKey)
                    res.send({ "message": "LoogedIn Success", "token": token })
                } else {
                    res.send("Wrong Information")
                }
            });
        } else {
            res.send("Wrong Information")
        }
    } catch (error) {
        console.log(error)
    }
})

user.post("/register", async (req, res) => {
    try {
        let { name, email, password ,address} = req.body
        bcrypt.hash(password, 5, async (err,hash) => {
            let data = userModel({ name, email, password:hash,address })
            await data.save()
            res.status(200).send("User Registered")
        });
    } catch (error) {
        console.log(error)
    }
})

user.patch("/:id/reset", async (req, res) => {
    try {
        let ID = req.params.id
        let payload = req.body
        let data = await userModel.find({ _id: ID })
        let user = data.userID
        let reqUser = req.body.userID
        if (user === reqUser) {
            await userModel.findByIdAndUpdate({ _id: ID }, payload)
            res.status().send("Data Got Updated")
        } else {
            res.send("You are not Authorised")
        }
    } catch (error) {
        console.log(error)
    }
})


module.exports = { user }