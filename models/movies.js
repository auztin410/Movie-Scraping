var mongoose = require("mongoose");


var Schema = mongoose.Schema;


var MovieSchema = new Schema({
  
  title: {
    type: String,
    required: true
  },
  
  link: {
    type: String,
    required: true
  },
  
  review: {
    type: Schema.Types.ObjectId,
    ref: "Review"
  }
});


var Movie = mongoose.model("Movie", MovieSchema);


module.exports = Movie;