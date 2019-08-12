const router = require('express').Router();

const db = require('../data/dbConfig.js');

router.get('/', (req,res) => {
    db('accounts')
    .then(account => {
        res.status(200).json(account)
    })
    .catch(err => {
        res.status(500).json({err: 'error getting posts'})
    })
})

router.get('/:id', (req,res) => {
    db('accounts').where({id: req.params.id})
    .first()
    .then(account => {
        res.status(200).json(account)
        // or remove .first() and do account[0]
    })
    .catch(err => {
        res.status(500).json({err: 'error getting posts'})
    })
})

router.post('/', (req, res) => {
    const accounts = req.body;
    db('accounts')
    // insert returns array, returns the last record of what was added, in this case id
    .insert(accounts, 'id') 
    .then(account => {
        res.status(201).json(account)
    })
    .catch(error => {
        res.status(500).json({error: 'error creating posts'})
    })
});

router.put('/:id', (req,res) => {
    const changes = req.body;
    db('accounts').where({id: req.params.id})
    .update(changes)
    .then(count => {
        if(count > 0)
            res.status(204).json(count)
        else 
            res.status(500).json({ err: 'error updating account'})
    })
    /* You can enter just one valid field to update, no need to fill out ALL required fields
    {
        "budget": 999
    }
    */
})

router.delete('/:id', (req, res) =>{
    db('accounts')
    .where('id', '=', req.params.id)// different way to id than previous get/put 
    .del()
    .then(count => {
        if(count > 0)
            res.status(204).json(count)
        else
            res.status(500).json({err: 'server error deleting account'})
    })
})

module.exports = router;