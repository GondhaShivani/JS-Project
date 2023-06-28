//1. make object array of questions
const questions = [
    {
        question : "Which is the largest animal in the world?",
        answer : [
            { text: "Shark", correct : false},
            { text: "blue whale", correct : true},
            { text: "Elephant", correct : false},
            { text: "Giraffe", correct : false},
        ]
    },
    {
        question : "Which is the smallest continent in the world?",
        answer : [
            { text: "Asia", correct : false},
            { text: "Africa", correct : false},
            { text: "Arctic", correct : false},
            { text: "Australia", correct : true},
        ]
    },
    {
        question : "Which is the largest desert in the world?",
        answer : [
            { text: "Kalahari", correct : false},
            { text: "Gobi", correct : false},
            { text: "Sahara", correct : false},
            { text: "Antarctica", correct : true},
        ]
    },{
        question : "Which is the smallest country in the world?",
        answer : [
            { text: "Vatican City", correct : true},
            { text: "bhutan", correct : false},
            { text: "Nepal", correct : false},
            { text: "Shri Lanka", correct : false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("timer");


let currentQuestionIndex = 0;
let score = 0;
let timer;
const totalTime = 15;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    timer = totalTime;
    

    // Update the innerHTML of the nextButton to "Next"
    nextButton.innerHTML = "Next";

    //functionCall to display the first question
    showQuestion();

    //for start 15 sec
    startTimer();

}

function showQuestion(){

    //functionCall for reset previous que. and options.
    resetState();

    //Question
    let currentQuestion = questions[currentQuestionIndex];//get currentQue from questions array

    let questionNo = currentQuestionIndex + 1;

    // Set the innerHTML of the questionElement to display the question number and text
    questionElement.textContent = (`${questionNo}. ${currentQuestion.question}`);//change text from que goes here to 1. question(text) 


    //Answer
    // Iterate through each answer in the current question's answer array
    currentQuestion.answer.forEach(answer => {

        // Create a button element for each answer
        const button = document.createElement("button");//create buttons

        button.textContent = answer.text;//make options

        // Add the "btn" class to the button for styling
        button.classList.add("btn");

        // Append the button to the answerButton element
        answerButtons.appendChild(button);

        // Set the dataset.correct property if the answer is correct
        //the code sets the dataset.correct property on buttons with correct answers. This can be useful for highlighting correct answers or performing additional actions based on correctness.
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }

        //button's click event
        button.addEventListener("click", selectAnswer);
    });
    startTimer();
}

function resetState(){

    //Hide the next button
    nextButton.style.display = "none";

    // Remove all child elements of the answerButtons element
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
        //the code removes the first child element repeatedly until there are no child elements left.
    }
}



//The function selectAnswer() is triggered when a user selects an answer option.
function selectAnswer(e){
    //selectedBtn represents the button element that the user clicked on to select their answer. 
    const selectedBtn = e.target;

    //The variable isCorrect is a boolean value that indicates whether the selected answer is correct or not based on the dataset.correct property of the button
    const isCorrect = selectedBtn.dataset.correct === "true";

    //add class for style background color of correct and incorrect ans.
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
            // For each button, if its dataset.correct property is set to "true", it adds the "correct" class to highlight the correct answer.
        }
        button.disabled = true;
    });
    clearInterval(timerInterval);
    nextButton.style.display= "block";
}

function startTimer() {
    timerElement.textContent = `Time Remaining: ${timer}s`;
    timerInterval = setInterval(() => {
      timer--;
      timerElement.textContent = `Time Remaining: ${timer}s`;
      if (timer === 0) {
        clearInterval(timerInterval);
        timerElement.textContent = "Time's Up!";
        showScore();
      }
    }, 1000);
}
  
nextButton.addEventListener("click", () => {
    clearInterval(timerInterval);
    timer = totalTime;

    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz(); //restart the quiz
    }
} );

function handleNextButton(){
    currentQuestionIndex++;//nextQuestion

    if(currentQuestionIndex < questions.length){
        clearInterval(timerInterval); // Clear the interval
        setTimeout(showQuestion, 1000);
        showQuestion();
    }
    else{
        showScore();
    }

}

function showScore(){
    resetState();

    switch (score) {
        case 4:
          displayGreeting("Wonderful!");
          break;
        case 3:
          displayGreeting("Great job!");
          break;
        case 2:
          displayGreeting("Good effort!");
          break;
        case 1:
          displayGreeting("Keep practicing!");
          break;
        case 0:
          displayGreeting("Better luck next time!");
          break;
    }
      
    function displayGreeting(msg){
        const greetings = document.createElement("p");
        greetings.innerHTML = msg;
        greetings.classList.add("greet");
        //by using greet class can apply CSS
        answerButtons.appendChild(greetings);
    }

    //instead of showing ques we have to show score so chnage innerHTML
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length} !!`;

    nextButton.innerHTML = "Play Again...";
    nextButton.style.display = "block";
}


startQuiz();