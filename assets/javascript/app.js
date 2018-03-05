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

    // Display next question and possible answers from questionArray
    // x amount of time to answer question
    // continually store correct guesses and wrong guesses
    // if correct, then show congratulation screen, wait few seconds, then run getQuestion
    // if wrong, then show wrong answer screen & correct answer, wait a few seconds, then run getQuestion
    // if time runs out, then show screen time ran out & correct answer, wait a few seconds, then run getQuestion

    // After all questions exhausted
    // display correct and wrong guesses
    // give option to restart game, if clicked, run newGame


    $(".btn-primary").on("click", function() {
        // generate question array
        newGame(); 
        // get and display next question after question array successfully retrieved
        getQuestion();
    });   

    

})