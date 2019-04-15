// const express = require('express');
// import mongoose from 'mongoose';
import express from "express";
import {users} from "../controllers/users.controllers"
import {news} from "../controllers/news.controllers";
const router = express.Router();

/* GET users listing. */
// router.get('/', (req, res, next) {
//   res.send('respond with a resource');
// });

/* GET ALL PRODUCTS */
router.get('/', (req, res, next) => {
  users.find((err, products) => {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE PRODUCT BY ID */
router.get('/:id', (req, res, next) => {
  users.findById(req.params.id,  (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.post('/', users.create);

// /* SAVE PRODUCT */
// router.post('/users', (req, res, next) => {
//   users.create(req.body,  (err, post) => {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

/* UPDATE PRODUCT */
router.put('/:id', (req, res, next) => {
  users.findByIdAndUpdate(req.params.id, req.body,  (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE PRODUCT */
router.delete('/:id', (req, res, next) => {
  users.findByIdAndRemove(req.params.id, req.body,  (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

export default router;
