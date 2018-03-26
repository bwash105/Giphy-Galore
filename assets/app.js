var heros = ["Superman", "Robin", "Batgirl", "Supergirl", "Hawkgirl", "Catwoman", "Black Canary", "Nightwing", "Green Arrow", "Power Girl", "The Flash", "Wonder Woman", "The Atom", "Green Lantern", "Aquaman", "Shazam", "Batman", "Superman", "Starfire", "Cyborg", "Martian Manhunter", "Swamp Thing"];

// displayMovieInfo function re-renders the HTML to display the appropriate content

function giphyDisplay() {
   var hero = $(this).attr("hero-name");
   var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
   hero + "&api_key=Z2cyZ5palPTFMbQLQeF52yTe5T2FpnDi&limit=10";

   $.ajax({
       url: queryURL,
       method: "GET"
   }).then(function(response) {
       console.log(queryURL);
       console.log(response);
// create div for hero data to populate
   for (var i = 0; i < heros.length; i++) {
    
    var heroDiv = $("<div>");

    var results = response.data;

    var p = $("<p>").text("Rating: " + results[i].rating);

    // Show the heros
    heroDiv.append(p);

    var image = $("<img>").attr("src", results[i].images.fixed_height.url);

    heroDiv.append(image);

    $("#heros").prepend(heroDiv);
    }
 }); 

}
    // create buttons from array
function renderButtons() {
    $("#heroButton").empty();
// Loop through the array
    for (var i = 0; i < heros.length; i++) {
        var a = $("<button>");
        a.addClass("hero-btn");
        a.attr("hero-name", heros[i]);
        a.text(heros[i]);
        $("#heroButton").append(a);
    }
}


$("#addHero").on("click", function(event) {
    event.preventDefault();

    var hero = $("#hero-input").val().trim();

    heros.push(hero);

    renderButtons();
});

$(document).on("click", ".hero-btn", giphyDisplay);

renderButtons();
