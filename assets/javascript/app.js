$(document).ready( function() {

    var triviaQueryURL = "https://opentdb.com/api.php?amount=10&category=21&type=multiple";
    var questionArray = [];
    var numQuestions = 0;
    var curQuestion = 0;

    var newAnswerRowStart = "<div class='row'><button class='btn btn-default poss-answer'>";

    // New Game function to GET Trivia Question Object from Open Trivia Database API
    // Category "Sports", Quantity "10", Type "Multiple Choice", Difficulty "Any"
    // Store response results into questionArray
    function newGame() {

        // remove start game button
        $(".btn-primary").toggle();

        $.ajax({
            url: triviaQueryURL,
            method: "GET"
          }).then(function(response) {
            for (var i = 0; i < response.results.length; i++) {
                questionArray.push(response.results[i]);
                console.log(questionArray[i]);
            }

            numQuestions = questionArray.length;
            console.log(numQuestions);
        });
    };

    // Display next question and possible answers from questionArray
    function getQuestion() {
        $("#question").text(questionArray[curQuestion].question);

        // display possible answers randomly - currently not random
        $(".answers").append(newAnswerRowStart + questionArray[curQuestion].correct_answer + "</button></div>");
        $(".answers").append(newAnswerRowStart + questionArray[curQuestion].incorrect_answers[0] + "</button></div>");
        $(".answers").append(newAnswerRowStart + questionArray[curQuestion].incorrect_answers[1] + "</button></div>");
        $(".answers").append(newAnswerRowStart + questionArray[curQuestion].incorrect_answers[2] + "</button></div>");

    }
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
        setTimeout( getQuestion, 1000);
    });   

    

})