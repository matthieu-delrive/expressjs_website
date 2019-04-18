import express from "express";
import passport from "passport";
import {getName, isAuthorised} from "../utils";
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log("render");
  res.render('login', { title: 'Express',admin: isAuthorised(req),  name: getName(req)});
});

router.post('/', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
     console.log(info);
    if(info) {return res.send(info.message)}
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.login(user, (err) => {
      if (err) { return next(err); }
      console.log("auth success");
      return res.redirect('/');
    })
  })(req, res, next);
});

export default router;
