import express from "express";

const router = express.Router();
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Express' });
});

router.post('/signup', (req, res) => {
  if(!req.body.email || !req.body.password){
    res.status("400");
    res.send("Invalid details!");
  } else {
    users.filter((user) => {
      if(user.id === req.body.id){
        res.render('signup', {
          message: "User Already Exists! Login or choose another user id"});
      }
    });
    var newUser = {id: req.body.id, password: req.body.password};
    Users.push(newUser);
    req.session.user = newUser;
    res.redirect('/protected_page');
  }
});

export default router;