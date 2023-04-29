const { Router } = require("express")



const { orderModel } = require("../model/orderModel")

const order = Router()

order.post("/order", async (req, res) => {
    try {
        let payload = req.body
        let data = userModel(payload)
        await data.save()
        res.status(201).send(data)
    } catch (error) {
        console.log(error)
    }
})

order.get("/order/:id", async (req, res) => {
    try {
        let ID = req.params.id
        let data = await orderModel.find({ _id: ID })
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
    }
})

order.patch("order/:id/", async (req, res) => {
    try {
        let ID = req.params.id
        let payload = req.body
        let data = await orderModel.find({ _id: ID })
        let user = data.userID
        let reqUser = req.body.userID
        if (user === reqUser) {
            await orderModel.findByIdAndUpdate({ _id: ID }, payload)
            res.status(204).send("Data Got Updated")
        } else {
            res.send("You are not Authorised")
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = { order }