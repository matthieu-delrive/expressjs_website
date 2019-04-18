import UsersSchema  from '../models/users.models';
import {isAuthorised} from "../utils";

export const users = {
  create,
  get,
  _update,
  delete: _delete

};
function create(req, res, next)  {
  // console.log(req.body);
  let user = new UsersSchema(
    {
      email: req.body.email,
      password: req.body.password,
      created_at: new Date(),
      update_at: new Date(),

    }
  );

  user.save(function (err) {
    if (err) {
      return next(err);
    }
    res.send('UsersSchema Created successfully')
  })
}
 function get(req, res, next) {
  UsersSchema.findById(req.params.id, function (err, product) {
    if (err) return next(err);
    res.json(product);
  })
}

   function _update(req, res, next) {
     if (!isAuthorised(req)) return res.json({response: "you need to be admin"}).status(403);
  UsersSchema.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
    if (err) return next(err);
    res.send('UsersSchema udpated.');
  });
}

function _delete(req, res,next) {
  if (!isAuthorised(req)) return res.json({response: "you need to be admin"}).status(403);
  UsersSchema.findByIdAndRemove(req.params.id, function (err) {
    if (err) return next(err);
    res.send('Deleted successfully!');
  })
}