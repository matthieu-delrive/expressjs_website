import express from "express";
import {news} from "../controllers/news.controllers"
import multer from "multer";

const router = express.Router();


let mult = multer({
  dest: "public/images/uploads",
  onError : function(err, next) {
    console.log('error', err);
    next(err);
  }
});

router.get('/', news.displayAll);
router.post('/create',
  mult.single('file'), news.create);

router.get('/create', news.createDisplay);
router.get('/:id', news.get);
router.get('/:id/display',  news.displayOneNews);
router.get('/:id/edit', news.edit);
router.put('/:id/update', mult.single('file'),  news._update);

router.delete('/:id/delete', news.delete);
export default router;