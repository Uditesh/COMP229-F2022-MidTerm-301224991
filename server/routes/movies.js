// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// call the movies model
let movie = require("../models/movies");

/* GET movies List page. READ */
router.get("/", (req, res, next) => {
  // find all movie in the books collection
  movie.find((err, movie) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("movies/index", {
        title: "Movies",
        movies: movie,
      });
    }
  });
});

//  GET the Movies Details page in order to add a new Movies
router.get("/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  res.render("movies/details", {
    title: "Add a new movie",
    movies: {
      Title: "",
      Description: "",
      Released: null,
      Director: "",
      Genre: "",
    },
  });
});

// POST process the Movies Details page and create a new Movies - CREATE
router.post("/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  let newMovie = movie({
    Title: req.body.title,
    Description: req.body.description,
    Released: req.body.released,
    Director: req.body.director,
    Genre: req.body.genre,
  });

  movie.create(newMovie, (err, movie) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the book list
      res.redirect("/movies");
    }
  });
});

// GET the Movies Details page in order to edit an existing Movies
router.get("/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  let id = req.params.id;

  movie.findById(id, (err, editMovie) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.render("movies/details", { title: "Edit Movie", movies: editMovie });
    }
  });
});

// POST - process the information passed from the details form and update the document
router.post("/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  let id = req.params.id;
  let updateMovie = movie({
    _id: id,
    Title: req.body.title,
    Description: req.body.description,
    Released: req.body.released,
    Director: req.body.director,
    Genre: req.body.genre,
  });

  movie.updateOne({ _id: id }, updateMovie, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect("/movies");
    }
  });
});

// GET - process the delete by user id
router.get("/delete/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  let id = req.params.id;

  movie.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the book list
      res.redirect("/movies");
    }
  });
});

module.exports = router;
