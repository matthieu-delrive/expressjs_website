import express from "express";
import {news} from "../controllers/news.controllers"
import multer from "multer";

const router = express.Router();
// router.all('/secret', function (req, res, next) {
//   console.log('Accessing the secret section ...');
//   next(); // pass control to the next handler
// // });
// const upload = multer({
//   dest: "public/images/uploads"
//   // you might also want to set some limits: https://github.com/expressjs/multer#limits
// });
router.post('/create', news.create);
// router.get('/create', );
router.get('/create', (req, res) => {
  console.log('Inside GET /authrequired callback');
  console.log(req);
  console.log(`User authenticated? ${req.isAuthenticated()}`);
  if(req.isAuthenticated()) {
    res.render('news-form', { title: 'Express' });
  } else {
    res.redirect('/')
  }
});
router.get('/:id', news.get);
router.get('/create', (req, res, next) => {
  if(req.isAuthenticated()) {
    res.render('login', { title: 'Express'})
  } else {
    res.redirect('/')
  }
});

router.put('/:id/update', news._update);

router.delete('/:id/delete', news.delete);
export default router;