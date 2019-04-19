import UsersSchema from '../models/users.models';
import {isAuthorised} from "../utils";
import * as bcrypt from "bcrypt-nodejs";

export const users = {
  create,
  get,
  _update,
  delete: _delete

};

/**
 * create a new user
 * @param req
 * @param res
 * @param next
 */
function create(req, res, next) {
  let user = new UsersSchema(
    {
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
      created_at: new Date(),
      update_at: new Date(),

    }
  );
  user.save(function (err) {
    if (err) {
      console.log('error');
      return next(err);
    }
    res.send('UsersSchema Created successfully')
  })
}

/**
 * get the user
 * @param req
 * @param res
 * @param next
 */
function get(req, res, next) {
  UsersSchema.findById(req.params.id, function (err, product) {
    if (err) return next(err);
    res.json(product);
  })
}

/**
 * update the user
 * @param req
 * @param res
 * @param next
 * @returns {*}
 * @private
 */
function _update(req, res, next) {
  if (!isAuthorised(req)) return res.json({response: "you need to be admin"}).status(403);
  UsersSchema.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
    if (err) return next(err);
    res.send('UsersSchema udpated.');
  });
}

/**
 * delete the user
 * @param req
 * @param res
 * @param next
 * @returns {*}
 * @private
 */
function _delete(req, res, next) {
  if (!isAuthorised(req)) return res.json({response: "you need to be admin"}).status(403);
  UsersSchema.findByIdAndRemove(req.params.id, function (err) {
    if (err) return next(err);
    res.send('Deleted successfully!');
  })
}