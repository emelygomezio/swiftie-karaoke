//Declare the variables
let score = 0;
let availableQuestions = 0;
let chosenQuestion = {};
let submitAnswer = true;
let questionsArray = [];

//The game consists of 10 questions. Each correct answer has a value of 20 points
const points = 20;
const questionLimit = 10;

//Variable declaration / DOM manipulation with # and classes
const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-selection"));
const scoreboard = document.querySelector("#score");

//Variable declaration for visual representation of progress
const progressText = document.querySelector("#progressText");
const progressBarFull = document.querySelector("#progressBarFull");

//The array of questions
let questions = [
  {
    question: "Cause coming back around here will be bad for your...",
    choice1: "mom 🤰🏽",
    choice2: "credit score 📉",
    choice3: "health 🤒",
    choice4: "criminal records 🧑🏽‍⚖️",
    answer: 3,
  },
  {
    question:
      "I am the one who makes you laugh when you know you are about to...",
    choice1: "make a questionable decision 🤔",
    choice2: "have an existential crisis 😖",
    choice3: "drunk text your ex 📱",
    choice4: "cry 😭",
    answer: 4,
  },
  {
    question: "She should keep in mind there is nothing I do better than...",
    choice1: "selling out stadiums 🎫",
    choice2: "revenge! 🔪",
    choice3: "winning 🏆",
    choice4: "writing gut-wrenching lyrics 🎶",
    answer: 2,
  },

  {
    question: "Loving him was like driving a new Maserati down a...",
    choice1: "dead-end street 💀",
    choice2: "suspicious road ❓",
    choice3: "haunted street 👻",
    choice4: "bumpy road 🚗",
    answer: 1,
  },
  {
    question:
      "He said, lets get out of this town, drive out of the city, away from the....",
    choice1: "crowds 🧑‍🤝‍🧑",
    choice2: "fans ⭐",
    choice3: "clowns 🤡",
    choice4: "sound 🔊",
    answer: 1,
  },
  {
    question:
      "Put the money in the bag and I stole the.... That was the last time you ever saw ....",
    choice1: "dress 👗 / Jess",
    choice2: "peas / green 💚",
    choice3: "keys 🗝️ / me",
    choice4: "ID / peace ☮️",
    answer: 3,
  },
  {
    question:
      "Fever dream high in the quiet of the night, you know that I ....",
    choice1: "want it 🤩",
    choice2: "caught it 🥍",
    choice3: "bough it 💳",
    choice4: "went to the ER",
    answer: 2,
  },
  {
    question: "You wear the same jewels that I gave you, as you...",
    choice1: "marry me 💍",
    choice2: "betray me 🗡️",
    choice3: "laugh at me 😆",
    choice4: "bury me ⚰️",
    answer: 4,
  },
  {
    question: "I could feel the mascara run, you told me that...",
    choice1: "your name is Tom 👨🏼",
    choice2: "you met someone 💔",
    choice3: "I needed a piece of gum 🤢",
    choice4: "you are 21 🎂",
    answer: 2,
  },
  {
    question: "And how the blood rushed into my cheeks so scarlet, it was...",
    choice1: "very red 🔴",
    choice2: "traumatic 😨",
    choice3: "maroon 🧱",
    choice4: "bejeweled 🪩",
    answer: 3,
  },
];

//GAME-LOGIC

//Start the game with a function
startGame = () => {
  availableQuestions = 0; //Game starts at 0 questions
  score = 0; //Score starts at 0 and will increment by 20 points with each correct answer
  questionsArray = [...questions];
  getNewQuestion();
};

//Declare a function to get a new randomized question from the array
getNewQuestion = () => {
  //Declare a variable to store selection of a random question from the array (1-10) rounded by the nearest number
  const randomQuestion = Math.floor(Math.random() * questionsArray.length);
    console.log(questionsArray)
  //If the condition is met, a new question will be returned
  if ( questionsArray.length === 0 || availableQuestions > questionLimit) {
    const result = gameResult(score);
    alert(`DECISION IS ${result}. Your score is ${score}`)
    
    return null;
  }

  //Refer to the #question in HTML file that contains the basic structure of the questions and assign the same properties to the random question selected
  chosenQuestion = questionsArray[randomQuestion];
  if(question){

      question.innerText = chosenQuestion.question;
  }

  //Specify how many questions the user has completed with a progress bar
  availableQuestions++;
  progressText.innerText = `Question ${availableQuestions} of ${questionLimit}`;
  progressBarFull.style.width = `${
    (availableQuestions / questionLimit) * 100
  }%`;

  //Retrieve the choice values from the array and include data in chosen question
  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = chosenQuestion["choice" + number];
  });

  //Eliminate question once it is used to prevent repetition
  questionsArray.splice(randomQuestion, 1);

  //As long as the boolean value of accepting answers continues to be true, the operation repeats until all questions are completed
  submitAnswer = true;
};

//Allow user to select an answer with a click and assign it to the respective variable that contains answer chosen
choices.forEach((choice) => {
  choice.addEventListener("click", (i) => {
    const chosenValue = i.target;
    const chosenAnswer = chosenValue.dataset["number"];

    //Check if the condition to accept input from users is not true and if so, stop execution of the code
    if (!submitAnswer) return;
    submitAnswer = false;

    //Compare the chosen answer with the correct value stored in the questions array and select a class with visual properties assigned (red/incorrect : green/correct)
    let evaluateAnswer =
      chosenAnswer == chosenQuestion.answer ? "correct" : "incorrect";

    //The score is meant to increase by 20 points everytime a correct answer is identified
    if (evaluateAnswer === "correct") {
      addScore(points);
    }

    //Generate a visual response that communicates the answer is correct or incorrect using color
    chosenValue.parentElement.classList.add(evaluateAnswer);

    //Add buffer to ensure smooth flow between visual representation of correct/incorrect answer and the display of a new randomized question
    setTimeout(() => {
      chosenValue.parentElement.classList.remove(evaluateAnswer);
      getNewQuestion();
    }, 200);
  });
});

//add 20 points to the scoreboard once a correct answer is identified from the questions array
addScore = (num) => {
  score += num; //increase score by 20 points and add to current number displayed
  scoreboard.innerText = score; //display updated score
};

//Win or lose logic
gameResult = (score) => {
  if (score >= 160) {
    return "You WON!";
  } else {
    return "You LOST. Try again!";
  }
};

//Finally, invoke the function to run the code
startGame();
