const {Router}=require("express")
const {restaurantModel}=require("../model/restaurantModel")

const restaurant = Router()


restaurant.get("/restaurant",async(req,res)=>{
    try {
        let data = await restaurantModel.find()
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
    }
})

restaurant.get("/restaurant/:id",async(req,res)=>{
    let ID = req.params.id
    try {
        let data = await restaurantModel.find({_id:ID})
        res.status(200).send(data)
    } catch (error) {
        console.log(error) 
    }
})

restaurant.get("/restaurant/:id/menu",async(req,res)=>{
    try {
        let ID = req.params.id
        let data = await restaurantModel.find({_id:ID})
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
    }
})

restaurant.post("/restaurant/:id/menu",async(req,res)=>{
    try {
        let ID = req.params.id
        let payload = req.body
        let data = await restaurantModel.findByIdAndUpdate({_id:ID},payload)
        res.status(201).send(`menu with ${id} got updated`)
    } catch (error) {
        console.log(error)
    }
})

restaurant.delete("/restaurant/:id/menu/:id",async(req,res)=>{
    try {
        let ID = req.params.id
        await restaurantModel.findByIdAndDelete({_id:ID})
        res.status(202).send(`menu with ${id} got deleted`)
    } catch (error) {
        console.log(error)
    }
})

module.exports={restaurant}