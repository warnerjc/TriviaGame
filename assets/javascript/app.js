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
                console.log(questionArray[i]);
            }

            numQuestions = questionArray.length;

            // get and display next question after question array successfully retrieved
            getQuestion();
            
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

    function getQuestion() {

        if (curQuestion < numQuestions) {
            console.log("Current Question: " + curQuestion);
            // store question answers in array
            possibleAnswers.push(questionArray[curQuestion].correct_answer);
            for (var j = 0; j < 3; j++) {
                possibleAnswers.push(questionArray[curQuestion].incorrect_answers[j]);
            }
    
            displayQuestion();
        } else {
            $(".btn-primary").toggle();
            $(".results").append("<div class='guesses'><h2>" + "Correct Guesses: " + correctGuesses + "</h2></div>");
            $(".results").append("<div class='guesses'><h2>" + "Wrong Guesses: " + wrongGuesses + "</h2></div>");
        }

    };

    function displayQuestion() {
        
        //might want to run display of question and answers separately
        //for loop to randomly position answers
        //for (var k = 0; k < 4; k++) {
        //    randNum = Math.floor(Math.random() * 3);
        //    console.log(randNum);
        //}

        // begin clock countdown as questions and answers are displayed
        // need to incapsulate this in a function
        $("#question").html(questionArray[curQuestion].question);

        // display possible answers randomly - currently not random
        $(".answers").append(newAnswerRowStart + questionArray[curQuestion].correct_answer + "</button></div>");
        $(".answers").append(newAnswerRowStart + questionArray[curQuestion].incorrect_answers[0] + "</button></div>");
        $(".answers").append(newAnswerRowStart + questionArray[curQuestion].incorrect_answers[1] + "</button></div>");
        $(".answers").append(newAnswerRowStart + questionArray[curQuestion].incorrect_answers[2] + "</button></div>");

        listenAnswer();

    };

    function listenAnswer() {
            
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