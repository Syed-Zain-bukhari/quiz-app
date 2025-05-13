// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVAH3s4GweJAQUpva6cpKH-4CsjxcKZpA",
  authDomain: "linking-websited.firebaseapp.com",
  databaseURL: "https://linking-websited-default-rtdb.firebaseio.com",
  projectId: "linking-websited",
  storageBucket: "linking-websited.firebasestorage.app",
  messagingSenderId: "807062995318",
  appId: "1:807062995318:web:949e52046570e9937b7a57",
};

// Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);
// var auth = firebase.auth();

// function signup(){
//   var name = document.getElementById("name").value;
//   var email = document.getElementById("email").value;
//   var password = document.getElementById("password").value;
// }

var questions = [
  {
    question: "HTML Stands for",
    option1: "Hyper Text Markup Language",
    option2: "Hyper Tech Markup Language",
    option3: "Hyper Touch Markup Language",
    corrAnswer: "Hyper Text Markup Language",
  },
  {
    question: "CSS Stands for",
    option1: "Cascoding Style Sheets",
    option2: "Cascading Style Sheets",
    option3: "Cascating Style Sheets",
    corrAnswer: "Cascading Style Sheets",
  },
  {
    question: "Which tag is used for most large heading",
    option1: "<h6>",
    option2: "<h2>",
    option3: "<h1>",
    corrAnswer: "<h1>",
  },
  {
    question: "Which tag is used to make element unique ",
    option1: "id",
    option2: "class  ",
    option3: "label",
    corrAnswer: "id",
  },
  {
    question: "Any element assigned with id, can be get in css ",
    option1: "by # tag",
    option2: "by @ tag",
    option3: "by & tag",
    corrAnswer: "by # tag",
  },
  {
    question: "CSS can be used with ______ methods ",
    option1: "8",
    option2: "3",
    option3: "4",
    corrAnswer: "3",
  },
  {
    question: "In JS variable types are ____________ ",
    option1: "6",
    option2: "3",
    option3: "8",
    corrAnswer: "8",
  },
  {
    question: "In array we can use key name and value ",
    option1: "True",
    option2: "False",
    option3: "None of above",
    corrAnswer: "False",
  },
  {
    question: "toFixed() is used to define length of decimal ",
    option1: "True",
    option2: "False",
    option3: "None of above",
    corrAnswer: "True",
  },
  {
    question: "push() method is used to add element in the start of array ",
    option1: "True",
    option2: "False",
    option3: "None of above",
    corrAnswer: "False",
  },
];
var quesElement = document.getElementById("ques");
var option1 = document.getElementById("opt1");
var option2 = document.getElementById("opt2");
var option3 = document.getElementById("opt3");
var index = 0;
var score = 0;
var timer = document.getElementById("timer");
var min = 1;
var sec = 59;

function startQuiz() {
  const name = document.getElementById("username").value.trim();
  const roll = document.getElementById("rollnumber").value.trim();

  userdetails = {
    name: name,
    rollno: roll,
  };
  console.log(userdetails);

  firebase.database().ref("student").set(userdetails);

  if (name === "" || roll === "") {
    alert("Please enter both name and roll number.");
    return;
  }
  document.getElementById("userInfoSection").style.display = "none";
  document.getElementById("quizSection").style.display = "block";

  nextQuestion();
}

function startTimer() {
  int = setInterval(function () {
    timer.innerHTML = `0${min} : ${sec}`;
    sec--;
    if (sec < 0) {
      min--;
      sec = 59;
      if (min < 0) {
        min = 1;
        sec = 59;
        nextQuestion();
      }
    }
  }, 1000);
}

function nextQuestion() {
  var nextBtn = document.getElementById("btn");

  var alloptions = document.getElementsByTagName("input");
  var obtmarks = document.getElementById("score");

  for (i = 0; i < alloptions.length; i++) {
    if (alloptions[i].checked) {
      alloptions[i].checked = false;
      var selectedValue = alloptions[i].value;
      var selectedoption = questions[index - 1][`option${selectedValue}`];
      var correctAns = questions[index - 1]["corrAnswer"];

      ansobj = {
        uservalue: selectedoption,
        correctvalue: correctAns,
      };
      console.log(ansobj);
      firebase.database().ref("student").push(ansobj);

      if (selectedoption === correctAns) {
        score++;
      }
    }
  }
  nextBtn.disabled = true;
  if (index >= questions.length) {
    obtmarks.innerText = `Your score is: ${(
      (score / questions.length) *
      100
    ).toFixed(2)}`;
  } else {
    quesElement.innerText = questions[index].question;
    option1.innerText = questions[index].option1;
    option2.innerText = questions[index].option2;
    option3.innerText = questions[index].option3;
    index++;
    clearInterval(int);
    min = 1;
    sec = 59;
    startTimer();
  }
}
function clicked() {
  var nextBtn = document.getElementById("btn");
  nextBtn.disabled = false;
}
startTimer();
