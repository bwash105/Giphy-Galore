var heros = ["Superman", "Robin", "Batgirl", "Supergirl", "Hawkgirl", "Catwoman", "Black Canary", "Nightwing", "Green Arrow", "Power Girl", "The Flash", "Wonder Woman", "The Atom", "Green Lantern", "Aquaman", "Shazam", "Batman", "Superman", "Starfire", "Cyborg", "Martian Manhunter", "Swamp Thing"];

// displayMovieInfo function re-renders the HTML to display the appropriate content

function giphyDisplay() {
    var hero = $(this).attr("hero-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        hero + "&api_key=Z2cyZ5palPTFMbQLQeF52yTe5T2FpnDi&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(queryURL);
        console.log(response);
        // create div for hero data to populate
        for (var i = 0; i < heros.length; i++) {

            var heroDiv = $("<div>");

            var results = response.data;

            var p = $("<p>").text("Rating: " + results[i].rating);

            // Show the heros
            heroDiv.append(p);

            var image = $("<img>").attr({
                "src": results[i].images.fixed_height_still.url,
                "data-still": results[i].images.fixed_height_still.url,
                "data-animate": results[i].images.fixed_height.url,
                "data-state": "still",
                "class": "gif"
            })

            heroDiv.append(image);

            $("#heros").prepend(heroDiv);
        }
    });
}
$("body").on("click", "img", function () {
    console.log("click");
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});



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


$("#addHero").on("click", function (event) {
    event.preventDefault();

    var hero = $("#hero-input").val().trim();

    heros.push(hero);

    renderButtons();

    $("#hero-input").val("");
});

$(document).on("click", ".hero-btn", giphyDisplay);

renderButtons();
