var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");


var axios = require("axios");
var cheerio = require("cheerio");


var db = require("./models");

var PORT = 3000;


var app = express();


app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));


mongoose.connect("mongodb://localhost/Movie");

// Routes


app.get("/scrape", function (req, res) {
  console.log("We are scraping!");

  axios.get("https://www.imdb.com/movies-coming-soon/?ref_=nv_mv_cs").then(function (response) {

    var $ = cheerio.load(response.data);


    $("td.overview-top").each(function (i, element) {

      var result = {};


      result.title = $(this)
        .children("h4")
        .text();
      result.link = $(this)
        .children("h4")
        .children("a")
        .attr("href");

        console.log(result.title);
        console.log(result.link);

      db.Movie.create(result)
        .then(function (dbMovie) {

          console.log(dbMovie);
        })
        .catch(function (err) {

          return res.json(err);
        });
    });

    
    res.send("Scrape Complete");
  });
});


app.get("/movies", function (req, res) {

  db.Movie.find({})
    .then(function (dbMovie) {
      res.json(dbMovie);
    })
    .catch(function (err) {
      res.json(err);
    })
});


app.get("/movies/:id", function (req, res) {

  db.Movie.findOne({ _id: req.params.id }).populate("review")
    .then(function (dbMovie) {
      console.log(dbMovie)
      res.json(dbMovie);
    })
    .catch(function (err) {
      res.json(err);
    });

});


app.post("/articles/:id", function (req, res) {

  db.Review.create(req.body)
    .then(function (dbReview) {
      return db.Movie.findOneAndUpdate({ _id: req.params.id }, { review: dbReview._id }, { new: true })

    })
    .then(function (updateReview) {
      res.json(updateReview);
    })
    .catch(function (err) {
      res.json(err);
    });

});


app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});


