const express = require('express');
const router = express.Router();
const Repo = require('../models/repo');

router.post('/search', (req, res)=>{
    // let q = req.query.q;
    // console.log(req.query);
    let filter = {}
    // if(req.query.title)
    //     filter.title = { $regex: req.query.title, $options: "$i" }
    // if(req.query.desc)
    //     filter.description = { $regex: req.query.desc, $options: "$i" }
    // if(req.query.tag)
    //     filter.tags = { $regex: req.query.tag, $options: "$i" }

    if(!req.query.text) return res.send({status:"error", message:"invalid parameter"});
    filter = { $or: [
        { language: { $regex: req.query.text, $options: "$i"} },
        { title: { $regex: req.query.text, $options: "$i" } },
        { description: { $regex: req.query.text, $options: "$i" } },
        { tags: { $regex: req.query.text, $options: "$i" } }
    ]}
    Repo.find(filter, {_id:0, __v:0}, (err, repos)=>{
        if(err) return res.send({status:"error", message:err.message});
        res.send({ status:"success", data: repos });
    })
});


module.exports = router;