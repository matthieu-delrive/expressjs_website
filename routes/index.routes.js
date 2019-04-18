import express from "express";
import NewsSchema from "../models/news.models"
import {isAuthorised, getName} from "../utils";
const router = express.Router();

/* GET home page. */

router.get('/', (req, res, next) => {
  NewsSchema.find({}, [], { $orderby : { 'created_at' : -1 , $limit: 10}}, (err, post) => {
    // console.log( post );
    res.render('index', { title: 'Express', news: post, admin: isAuthorised(req), name: getName(req)});

  });
});


module.exports = router;
