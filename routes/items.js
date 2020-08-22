const express = require('express')
const router = express.Router()
const Item = require('../models/Item')

// Create new Item
router.post('/newItem', async(req, res) => {
    const {name, description, price, category, longDescription} = req.body
    try {
        let item = await Item.findOne({name})
        if(item){
            return res.status(400).send('Item exists')
        }

         item = new Item({
            name,
            description,
            longDescription,
            price,
            category
        })
        await item.save()
        res.json(item)
    } catch (err) {
        console.error(err.messages)
        res.status(500).send('Server Error')
    }
})

// Delete Item
router.delete('/deleteItem', async(req, res) => {
    try {
        const item = await Item.findByIdAndRemove(req.body._id)
        if(!item){
            return res.status(400).send('Item does not exists')
        }
        res.status(201).send('Item deleted')
    } catch (err) {
        console.error(err.messages)
        res.status(500).send('Server Error')
    }
})

// Get by category
router.get('/:category', async(req, res) => {
    try {
        const category = await Item.find({ category: req.params.category})
        if(category.length == 0 || !category){
            return res.status(400).send('Category does not exists')
        }
        res.send(category)
    } catch (err) {
        console.error(err.messages)
        res.status(500).send('Server Error')
    }
})

// Get Item by ID
router.get('/itemPage/:id', async(req, res) => {
    try {
        const item = await Item.findById(req.params.id)
        res.send(item)
    } catch (err) {
        console.error(err.messages)
        res.status(500).send('Server Error')
    }
})

module.exports = router