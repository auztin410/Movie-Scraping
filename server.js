var cheerio = require("cheerio");
var request = require("request");


request("https://www.imdb.com/movies-coming-soon/?ref_=nv_mv_cs", function(error, response, html) {

  var $ = cheerio.load(html);

 
  var results = [];

  
  $("td.overview-top").each(function(i, element) {

    var title = $(element).find("h4").find("a").attr("title");
    var link = $(element).find("h4").find("a").attr("href");

    
    results.push({
      title: title,
      link: link
    });
  });

  
  console.log(results);
});

