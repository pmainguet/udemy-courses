/*
1. Function constructor called Question to describe a question including question itself, ansswers, correct answer
2. Create a couple of questions
3. Store them in an array
4. Select one random question and log it to the console, together with answers
5. Use prompt function to ask the user the correct answer
6. Check if the answer is correct and print to the console
7. Suppose this function will be a plugin to others programmers

8. After result, display next random question, to that the game never ends
9. include option to quit the game when writing "exit" instead of result
10. Track the user's socre (try with closure)
11. Display the score in console
*/

// 7. Suppose this function will be a plugin to others programmers

(function () {

    //1. Function constructor called Question to describe a question including question itself, ansswers, correct answer

    var Question = function (question, answers, correctAnswer) {
        this.question = question;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    }

    Question.prototype.displayQuestion = function () {
        console.log(this.question);
        for (var i = 0; i < this.answers.length; i++) {
            console.log(this.answers[i]);
        }
    }

    Question.prototype.checkAnswer = function (answer, callback) {
        if (parseInt(answer) === this.correctAnswer) {
            console.log("Correct ! The answer is " + this.answers[answer])
            if (callback) {
                callback()
            }
        } else {
            console.log("Wrong answer ! Your anwser was " + this.answers[answer] + ", but the correct answer is " + this.correctAnswer)
        }
        console.log('-----------------');
    }

    //2. Create a couple of questions + 3. Store them in an array

    var data = [{
            question: "What is the best teacher ?",
            answers: ['0. Jonas', '1. John', '2. Ema'],
            correctAnswer: 1
        },
        {
            question: "What is the capital of Canada ?",
            answers: ['0. Paris', '1. London', '2. Ottawa'],
            correctAnswer: 2
        },
        {
            question: "Where is Bryan ?",
            answers: ['0. in the kitchen', '1. out', '2. in'],
            correctAnswer: 0
        },
    ];

    var questions = [];
    for (var i = 0; i < data.length; i++) {
        questions.push(new Question(data[i].question, data[i].answers, data[i].correctAnswer));
    }

    //10. Track the user's score (try with closure)
    var keepScore = score(0);
    nextQuestion();

    function nextQuestion() {
        // 4. Select one random question and log it to the console, together with answers
        var rand = Math.floor(Math.random() * data.length);
        var selectedQuestion = questions[rand];
        selectedQuestion.displayQuestion();

        // 5. Use prompt function to ask the user the correct answer

        var answer = prompt("Select the right answer");

        // 9. include option to quit the game when writing "exit" instead of result
        if (answer != 'exit') {
            // 6. Check if the answer is correct and print to the console
            selectedQuestion.checkAnswer(answer, keepScore());
            // 8. After result, display next random question, to that the game never ends
            nextQuestion();
        } else {
            console.log('exit')
        }
    }

    function score(initialScore) {
        var s = initialScore;
        return function () {
            s++;
            console.log('Your score is now: ' + s);
        }
    }

})();