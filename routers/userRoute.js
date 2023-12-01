const express = require ('express')
const User=require('../models/userModel')
const router = express.Router()
const moment = require('moment')

router.post('/login', async (req, res) => {
    try{
        const {
            email,
            password
        } = req.body

        console.log(req.body);
    
        let user = await User.findOne({ email: email })
        if(!user){
            return res.status(404).send('User not found')
        }
    
        let userPassword = user.password
        if(userPassword != password){
            return res.status(400).send('Password mismatch')
        }

        return res.status(200).send('User successfully authenticated')
    }catch(err){
        return res.status(500).send(err.message)    
    }
})

router.post('/register', async (req, res) => {
    try{
        const {
            email,
            password
        } = req.body
    
        let user = await User.findOne({ email: email })
        if(user){
            return res.status(404).send('User Already Registered')
        }

        let newUser = await User.create({ 
            email: email,
            password: password,
            joined_at: moment().format('YYYY-MM-DD HH:mm:ss'),
         })

        return res.status(200).send('User successfully created')
    }catch(err){
        return res.status(500).send(err.message)    
    }
})

router.get('/users', async (req, res) => {
    try{
        let users = await User.find()
        return res.status(200).json(users)
    }catch(err){
        return res.status(500).send(err.message)
    }
})

router.get('/users/count', async (req, res) => {
    let count = await User.count()
    return res.status(200).json(count)
  })

router.delete('/users/:id', async (req, res) => {
    try{
        let { id } = req.params
        let isDeleted = await User.deleteOne({
            _id: id
        })

        if(isDeleted){
            return res.status(200).send('user was deleted')
        }

        return res.status(400).send('not deleted')
    }catch(err){
        return res.status(500).send(err.message)
    }
})
module.exports = router