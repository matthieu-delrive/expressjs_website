import express from "express";
import {getName, isAuthorised} from "../utils";

const router = express.Router();
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Express', admin: isAuthorised(req), name: getName(req)} );
});

export default router;