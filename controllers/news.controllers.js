import NewsSchema from "../models/news.models";
import fs from "fs";
import {isAuthorised} from '../utils.js'
import {getName} from "../utils";

export const news = {
  createDisplay,
  edit,
  displayAll,
  create,
  displayOneNews,
  get,
  _update,
  delete: _delete

};

function createDisplay(req, res, next) {
  console.log(`User authenticated? ${req.isAuthenticated()}`);
  if (isAuthorised(req)) {
    res.render('news-form', {title: 'Express', admin: isAuthorised(req), name: getName(req)});
  } else {
    res.redirect('/')
  }
}

function edit(req, res, next) {
  console.log(`User authenticated? ${req.isAuthenticated()}`);
  if (isAuthorised(req)) {
    res.render('news-edit', {title: 'Express', admin: isAuthorised(req), name: getName(req), id: req.params.id});
  } else {
    res.redirect('/')
  }
}

function displayOneNews(req, res, next) {
  NewsSchema.findById(req.params.id, function (err, response) {
    if (err) res.redirect('/news');
    const url = "news/" + req.params.id;
    console.log(response);
    if (response === null) res.redirect('/news');
    res.render('news-id', {title: "blog", news: response, admin: isAuthorised(req), name: getName(req), url: url})
  })
}

function isFileImage(file) {
  if (!file) return false;
  const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
  return acceptedImageTypes.includes(file['mimetype']);
}

function displayAll(req, res, next) {
  NewsSchema.find({}, [], {$orderby: {'created_at': -1}}, (err, post) => {
    res.render('news', {title: "blog", news: post, admin: isAuthorised(req), name: getName(req)})
  })
}

function create(req, res, next) {
  if (!isAuthorised(req)) {
    return res.json({response: "you need to be a admin"}).status(403)
  }
  const tempPath = req.file.path;
  const targetPath = tempPath.replace('/\\/g', '/').replace('public', '');
  console.log("test");

  if (isFileImage(req.file)) {
    console.log("success");
    console.log("teast");
    console.log(targetPath);
    let news = new NewsSchema(
      {
        title: req.body.title,
        content: req.body.content,
        summary: req.body.summary,
        image: targetPath,
        created_at: new Date(),
        update_at: new Date(),
      }
    );
    news.save(function (err) {
      if (err) {
        console.log('save problem');
        return next(err);
      }
      res.status(200).json('NewsSchema Created successfully')
    })
  } else {
    console.log("test32");
    fs.unlink(tempPath, err => {
      return res
        .status(403)
        .contentType("text/json")
        .json({"error": "Only image files are allowed!"});
    });
  }
}

function get(req, res, next) {
  console.log(req.params.id);
  NewsSchema.findById(req.params.id, function (err, response) {
    if (err) return next(err);
    res.json(response);
  })
}

function _update(req, res, next) {
  if (!isAuthorised(req)) {
    return res.json({response: "you need to be a admin"}).status(403)
  }
  const tempPath = req.file.path;
  const targetPath = tempPath.replace('/\\/g', '/').replace('public', '');
  if (isFileImage(req.file)) {
    req.body.image = targetPath;
    NewsSchema.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, response) {
      if (err) return next(err);
      res.json(response);
    });
  } else {
    fs.unlink(tempPath, err => {
      return res
        .status(403)
        .contentType("text/json")
        .json({"error": "Only image files are allowed!"});
    });
  }
}

function _delete(req, res, next) {
  if (!isAuthorised(req)) {
    return res.json({response: "you need to be a admin"}).status(403)
  }
  NewsSchema.findByIdAndRemove(req.params.id, function (err, response) {
    if (err) return next(err);
    res.json(response);
  })
}