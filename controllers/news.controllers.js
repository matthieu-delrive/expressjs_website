import NewsSchema from "../models/news.models";
import fs from "fs";

export const news = {
  create,
  get,
  _update,
 delete: _delete

};
function isFileImage(file) {
  const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

  return file && acceptedImageTypes.includes(file['type'])
}
function create(req, res, next)  {
  console.log(req.body);
  let news = new NewsSchema(
    {
      title: req.body.title,
      content: req.body.content,
      summary: req.body.summary,
      image: req.body.content,
      created_at: new Date(),
      update_at: new Date(),

    }
  );

  news.save(function (err) {
    if (err) {
      return next(err);
    }
    res.send('NewsSchema Created successfully')
  })
};

function get(req, res) {
  NewsSchema.findById(req.params.id, function (err, product) {
    if (err) return next(err);
    res.send(product);
  })
};

function _update(req, res) {
  NewsSchema.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
    if (err) return next(err);
    res.send('NewsSchema udpated.');
  });
};
//
function _delete(req, res) {
  NewsSchema.findByIdAndRemove(req.params.id, function (err) {
    if (err) return next(err);
    res.send('Deleted successfully!');
  })
};