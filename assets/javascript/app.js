$(document).ready( function() {

    var triviaQueryURL = "https://opentdb.com/api.php?amount=10&category=21&type=multiple";
    var questionArray = [];
    var possibleAnswers = [];
    var randString = ""
    var randNum = 0;
    var numQuestions = 0;
    var curQuestion = 0;
    var correctGuesses = 0;
    var wrongGuesses = 0;

    var newAnswerRowStart = "<div class='row poss-answer'><button class='btn btn-default'>";

    // New Game function to GET Trivia Question Object from Open Trivia Database API
    // Category "Sports", Quantity "10", Type "Multiple Choice", Difficulty "Any"
    // Store response results into questionArray
    function newGame() {

        questionArray = [];
        possibleAnswers = [];
        randString= "";
        randNum = 0;
        numQuestions = 0;
        curQuestion = 0;
        correctGuesses = 0;
        wrongGuesses = 0;

        $(".row-question").toggle();
        $(".row-answers").toggle();

        // remove start game button
        $(".btn-primary").toggle();
        // remove previous game results
        $(".guesses").remove();

        $.ajax({
            url: triviaQueryURL,
            method: "GET"
          }).then(function(response) {
            for (var i = 0; i < response.results.length; i++) {
                questionArray.push(response.results[i]);
            }

            numQuestions = questionArray.length;

            // get and display next question after question array successfully retrieved
            getQuestion();
            
        });
    };

    // if correct, then show congratulation screen, wait few seconds, then run getQuestion
    // if wrong, then show wrong answer screen & correct answer, wait a few seconds, then run getQuestion
    // if time runs out, then show screen time ran out & correct answer, wait a few seconds, then run getQuestion
    // After all questions exhausted
    // display correct and wrong guesses
    // give option to restart game, if clicked, run newGame

    function getQuestion() {

        if (curQuestion < numQuestions) {

            possibleAnswers.push(questionArray[curQuestion].correct_answer);

            for (var j = 0; j < 3; j++) {
                possibleAnswers.push(questionArray[curQuestion].incorrect_answers[j]);
            }            
    
            displayQuestion();

        } else {
            $(".row-question").toggle();
            $(".row-answers").toggle();
            $(".btn-primary").toggle();
            $(".row-results").toggle();
            $(".row-results").append("<div class='guesses'><h2>" + "Correct Guesses: " + correctGuesses + "</h2></div>");
            $(".row-results").append("<div class='guesses'><h2>" + "Wrong Guesses: " + wrongGuesses + "</h2></div>");
        }

    };

    function displayQuestion() {

        /**
         * Randomize array element order in-place.
         * Using Durstenfeld shuffle algorithm.
         */            
        for (var i = possibleAnswers.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = possibleAnswers[i];
            possibleAnswers[i] = possibleAnswers[j];
            possibleAnswers[j] = temp;
        }

        $("#question").html(questionArray[curQuestion].question);

        // display possible answers randomly - currently not random
        $(".col-answers").append(newAnswerRowStart + possibleAnswers[0] + "</button></div>");
        $(".col-answers").append(newAnswerRowStart + possibleAnswers[1] + "</button></div>");
        $(".col-answers").append(newAnswerRowStart + possibleAnswers[2] + "</button></div>");
        $(".col-answers").append(newAnswerRowStart + possibleAnswers[3] + "</button></div>");

        listenAnswer();

    };

    function listenAnswer() {

        // begin clock countdown as questions and answers are displayed
        // need to incapsulate this in a function
            
        $(".btn-default").on("click", function() {

            if (this.innerText === questionArray[curQuestion].correct_answer) {
                alert("You Won");
                curQuestion++;
                correctGuesses++;
                $("#question").html("");
                $(".poss-answer").remove();
                getQuestion();
            } else {
                alert("You Lost");
                curQuestion++;
                wrongGuesses++;
                $("#question").html("");
                $(".poss-answer").remove();
                getQuestion();
            }
        });

    };

    // On click listener for start game
    $(".btn-primary").on("click", function() {
        // generate question array
        newGame(); 
    });       

})