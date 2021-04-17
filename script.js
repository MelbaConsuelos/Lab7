$(document).ready(function () {
    var API_KEY = "f4bCqKHmCgWMDmWdgCEWK9YwNQxp9vnK";
    var temas = ["parrot", "guinea pig", "cat", "horse", "dog"];
    generateButtons();
  
    function generateButtons() {
        $("#animals").html("");
      for (var i = 0; i < temas.length; i++) {
        $("#animals").append(
          `<button type="button" class="animal" value = " ` + temas[i] + `">` + temas[i] + `</button>`);
      }
    };
  
  
    $("body").on("click", ".animal", function (e) {
      $("#gifs").html("");
      e.preventDefault();
      var item = e.target.value;
      var xhr = $.get(
        "https://api.giphy.com/v1/gifs/search?q=" +
          item +
          "&api_key=" +
          API_KEY +
          "&limit=10"
      );
  
      xhr.done(function (response) {
        console.log("success got data", response);
  
        for (var i = 0; i < response.data.length; i++) {
          var rating = response.data[i].rating;
          var still = response.data[i].images.fixed_height_still.url;
          var url = response.data[i].images.fixed_height.url;
          $("#gifs").append(`<div class="singleGif" > 
                  <p> Rating: ${rating} </p>
                  <img data-url= ${url} data-still= ${still} data-isMoving = false src= ${still}> </div>`);
        }
      });
    });
  
    $("body").on("click", "img", function (e) {
      e.preventDefault();
      if ($(this).attr("data-isMoving") == "false") {
        var url = $(this).attr("data-url");
        $(this).attr("src", url);
        $(this).attr("data-isMoving", true);
      } else {
        var still = $(this).attr("data-still");
        $(this).attr("src", still);
        $(this).attr("data-isMoving", false);
      }
    });
  
    $("#add-animal").on("click", function (e) {
      e.preventDefault();
      var newAnimal = $("#animal-input").val();
      temas.push(newAnimal);
      generateButtons();
    });
  
  });