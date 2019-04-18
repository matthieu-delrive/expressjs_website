import express from "express";
import {users} from "../controllers/users.controllers"
const router = express.Router();
router.get('/', (req, res, next) => {
  users.find((err, response) => {
    if (err) return next(err);
    res.json(response);
  });
});

router.get('/:id', users.get);

router.post('/', users.create);

router.put('/:id', users._update);

router.delete('/:id', users.delete);

export default router;
