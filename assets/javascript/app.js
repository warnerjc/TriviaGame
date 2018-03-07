$(document).ready( function() {

    var triviaQueryURL = "https://opentdb.com/api.php?amount=10&category=21&type=multiple";
    var questionArray = [];
    var possibleAnswers = [];
    var currentQuestion = "";
    var numQuestions = 0;
    var curQuestion = 0;
    var correctGuesses = 0;
    var wrongGuesses = 0;
    var countDown;

    var newAnswerRowStart = "<div class='row poss-answer'><h2>";

    // New Game function to GET Trivia Question Object from Open Trivia Database API
    // Category "Sports", Quantity "10", Type "Multiple Choice", Difficulty "Any"
    // Store response results into questionArray
    function newGame() {

        questionArray = [];
        possibleAnswers = [];
        currentQuestion = "";
        numQuestions = 0;
        curQuestion = 0;
        correctGuesses = 0;
        wrongGuesses = 0;
        countDown;

        $(".row-question").toggle();
        $(".row-answers").toggle();
        $(".btn-success").toggle();
        
        $.ajax({
            url: triviaQueryURL,
            method: "GET"
          }).then(function(response) {
            for (var i = 0; i < response.results.length; i++) {
                questionArray.push(response.results[i]);
            }

            numQuestions = questionArray.length;

            getQuestion();
            
        });
    };


    // -------------------
    // If, current question count is less than number of questions in array, then
    // Retrieve current question and correct answer from question array
    // Retrieve possible answers from current question from question array
    // Randomize answer order in possible answers array
    // Run displayQuestion
    // -------------------
    // Else, run endGame as all questions exhausted
    function getQuestion() {

        possibleAnswers = [];

        if (curQuestion < numQuestions) {

            currentQuestion = questionArray[curQuestion].question;
            console.log( questionArray[curQuestion].correct_answer);
            possibleAnswers.push(questionArray[curQuestion].correct_answer);

            for (var j = 0; j < 3; j++) {
                possibleAnswers.push(questionArray[curQuestion].incorrect_answers[j]);
            } 
    
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

            displayQuestion();

        } else {
            endGame();
        }

    };

    // Display results of game after all questions exhausted
    function endGame () {
        $(".row-question").toggle();
        $(".row-answers").toggle();
        $(".btn-success").toggle();
        $(".row-results").toggle();
        $(".count-down").html("");
        $(".row-results").append("<div class='guesses'><h2>" + "Correct Guesses: " + correctGuesses + "</h2></div>");
        $(".row-results").append("<div class='guesses'><h2>" + "Wrong Guesses: " + wrongGuesses + "</h2></div>");
    }


    // Display current question and answers
    // After display, call listenAnswer and timeAnswer
    function displayQuestion() {

        $("#question").html(currentQuestion);
        $(".col-answers").append(newAnswerRowStart + possibleAnswers[0] + "</h2></div>");
        $(".col-answers").append(newAnswerRowStart + possibleAnswers[1] + "</h2></div>");
        $(".col-answers").append(newAnswerRowStart + possibleAnswers[2] + "</h2></div>");
        $(".col-answers").append(newAnswerRowStart + possibleAnswers[3] + "</h2></div>");

        timeAnswer();
        listenAnswer();
        

    };

    // Interval function that gives user set amount of time to answer questions
    function timeAnswer() {

        var setTime = 30;
        $(".count-down").html(setTime);

        countDown = setInterval(gameTime, 1000);

        function gameTime() {

            if (setTime === 0) {
                clearInterval(countDown);
                ranOutofTime();
            } else {
                setTime--;
            }
            $(".count-down").html(setTime);
        }        
    }

    // Alert user they ran out of time, get next question
    function ranOutofTime() {        
        alert("Time Ran Out!!");
        curQuestion++;
        wrongGuesses++;
        $("#question").html("");
        $(".poss-answer").remove();
        getQuestion();
    }

    function rightAnswer() {                        
        alert("Correct Guess!!");
        curQuestion++;
        correctGuesses++;
        $("#question").html("");
        $(".poss-answer").remove();
        getQuestion();
    }

    function wrongAnswer() {
        alert("Wrong Guess!!");
        curQuestion++;
        wrongGuesses++;
        $("#question").html("");
        $(".poss-answer").remove();
        getQuestion();
    }

    // Listen for answer guess
    function listenAnswer() {

        $(".poss-answer").on("click", function()  {

            clearInterval(countDown);

            if (this.innerText ===  questionArray[curQuestion].correct_answer) {
                rightAnswer();
            } else {
                wrongAnswer();
            }    
        });

    };

    // On click listener for start game
    $(".btn-success").on("click", function() {
        // generate question array
        newGame(); 
    });       

})