$(document).ready( function() {

    var triviaQueryURL = "https://opentdb.com/api.php?amount=10&category=21&type=multiple";
    var questionArray = [];

    // New Game function to GET Trivia Question Object from Open Trivia Database API
    // Category "Sports", Quantity "10", Type "Multiple Choice", Difficulty "Any"
    // Store response results into questionArray
    function newGame() {
        $.ajax({
            url: triviaQueryURL,
            method: "GET"
          }).then(function(response) {
            for (var i = 0; i < response.results.length; i++) {
                questionArray.push(response.results[i]);
                console.log(questionArray[i]);
            }
        });
    };

    $(".btn-primary").on("click", function() {
        newGame(); 
    });   

    

})