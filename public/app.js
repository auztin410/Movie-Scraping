$.getJSON("/movies", function(data) {
    
    for (var i = 0; i < data.length; i++) {
      
      $("#movies").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
  });
  
  
  
  $(document).on("click", "p", function() {
    
    $("#reviews").empty();
    
    var thisId = $(this).attr("data-id");
  
    
    $.ajax({
      method: "GET",
      url: "/movies/" + thisId
    })
      
      .then(function(data) {
        console.log(data);
        
        $("#reviews").append("<h2>" + data.title + "</h2>");
        
        $("#reviews").append("<input id='titleinput' name='title' >");
        
        $("#reviews").append("<textarea id='bodyinput' name='body'></textarea>");
        
        $("#reviews").append("<button data-id='" + data._id + "' id='savereview'>Save Review</button>");
  
        
        if (data.review) {
          
          $("#titleinput").val(data.review.title);
          
          $("#bodyinput").val(data.review.body);
        }
      });
  });
  
  
  $(document).on("click", "#savereview", function() {
    
    var thisId = $(this).attr("data-id");
  
    
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        
        title: $("#titleinput").val(),
        
        body: $("#bodyinput").val()
      }
    })
      
      .then(function(data) {
        
        console.log(data);
        
        $("#reviews").empty();
      });
  
    
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });
  