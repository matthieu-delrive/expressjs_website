import express from "express";
import passport from "passport";
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log("render");
  res.render('login', { title: 'Express' });
});

router.post('/', (req, res, next) => {
  console.log("12");
  console.log(req.body);
  passport.authenticate('local', (err, user, info) => {
    // console.log(user);
    if(info) {return res.send(info.message)}
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.login(user, (err) => {
      if (err) { return next(err); }
      console.log("auth success");
      // return res.send("success")
      return res.redirect('/news/create');
    })
  })(req, res, next);
});

export default router;
