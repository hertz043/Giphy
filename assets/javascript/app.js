
var topics = [
    "America",
    "France",
    "New Zealand",
    "Sweden",
    "Russia",
    "India",
    "Mexico",
    "Japan",
    "South Korea",
    "Australia"
];

$(document).ready(printButtons());


//Function that that prints the array objects onto the DOM as buttons
function printButtons() {
    $("#buttonBar").empty();

    for (i = 0; i < topics.length; i++) {

        var makeButton = $("<button>");

        makeButton.addClass("searchButton");
        makeButton.attr("data-state", topics[i]);
        makeButton.text(topics[i]);
        
        $("#buttonBar").append(makeButton);

    };
};

//click handler for the Add Another Button function, pushes the added string into the topics array and then prints the buttons again
$("#addState").on("click", function(event) {
    event.preventDefault();

    var newState = $("#newStateInput").val().trim();
    // console.log(newState);

    topics.push(newState);

    $("#newStateInput").val(" "); //clears input field after submitting new state

    printButtons()
});

//Click handler that queries the giphy API with the button's value

$(document).on("click", "button", function() {
    var searchState = $(this).attr("data-state");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchState + "&api_key=wjRQ1zdYFUzNBw8L2eOYGl72kK90rbRf&limit=10&rating=g";
    // console.log(searchState);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        // console.log(response);

        $("#gifsGoHere").empty();

        let gifData = response.data;

        gifData.forEach(
            function(gifData) {
                
            let newGIFDiv = $("<div>");
            newGIFDiv.attr("class", "gifDiv");

            let stateGif = $("<img>");
            stateGif.attr("src", gifData.images.fixed_height.url);
            stateGif.attr("data-still", gifData.images.fixed_height_still.url);
            stateGif.attr("data-animate", gifData.images.fixed_height.url);
            stateGif.attr("data-state", "animate");
            stateGif.attr("class", "gif");

            let rating = $("<p>");    
            rating.text("Rated: "+ gifData.rating);

            newGIFDiv.append(stateGif);
            newGIFDiv.append(rating);

            $("#gifsGoHere").append(newGIFDiv);


            });


    });

});

// click handler for starting and stopping the gifs, using an If statement to check the data-state attribute, which determines what state it's in and switches the URL from to the opposite state

$(document).on("click", ".gif", function() {

    let startStop = $(this).attr("data-state");
    // console.log(startStop);

    if (startStop === "animate") {
        let url = $(this).attr("data-still");
        $(this).attr("src", url);
        $(this).attr("data-state", "still");
    }

    else if (startStop === "still") {
        let url = $(this).attr("data-animate");
        $(this).attr("src", url);
        $(this).attr("data-state", "animate");
    }

});

