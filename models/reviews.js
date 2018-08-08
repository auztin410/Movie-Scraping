var mongoose = require("mongoose");


var Schema = mongoose.Schema;


var ReviewSchema = new Schema({
  
  title: String,
  
  body: String
});


var Review = mongoose.model("Review", ReviewSchema);


module.exports = Review;