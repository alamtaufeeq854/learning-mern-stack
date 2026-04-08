document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const nextBtn = document.getElementById("next-btn");
  const restartBtn = document.getElementById("restart-btn");
  const questionContainer = document.getElementById("question-container");
  const questionText = document.getElementById("question-text");
  const choicesList = document.getElementById("choices-list");
  const resultContainer = document.getElementById("result-container");
  const scoreDisplay = document.getElementById("score");
  const questions = [
    {
      question: "What is the capital of India?",
      choices: ["Delhi", "Mumbai", "Kolkata", "Chennai"],
      answer: 0,
      marks: 5,
    },
    {
      question: "Which language runs in the browser?",
      choices: ["Python", "Java", "C++", "JavaScript"],
      answer: 3,
      marks: 10,
    },
    {
      question: "2 + 2 = ?",
      choices: ["3", "4", "5", "6"],
      answer: 1,
      marks: 2,
    },
    {
      question: "Which company developed JavaScript?",
      choices: ["Microsoft", "Google", "Netscape", "Apple"],
      answer: 2,
      marks: 8,
    },
  ];

  let currentQuestionIndex = 0;
  let score = 0;
  let totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);
  let answered = false;

  startBtn.addEventListener("click", startQuiz);
  nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  });

  restartBtn.addEventListener("click", restart);

  function startQuiz() {
    startBtn.classList.add("hidden");
    resultContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");

    showQuestion();
  }

  function showQuestion() {
    answered = false;
    nextBtn.classList.add("hidden");
    questionText.textContent = questions[currentQuestionIndex].question;
    choicesList.innerHTML = "";
    questions[currentQuestionIndex].choices.forEach((choice, index) => {
      const li = document.createElement("li");
      li.textContent = choice;

      li.addEventListener("click", () => selectAnswer(index));

      choicesList.appendChild(li);
    });
  }

  function selectAnswer(choice) {
    if (answered) return;

    answered = true;

    const correctAnswer = questions[currentQuestionIndex].answer;

    if (choice == correctAnswer) {
      score += questions[currentQuestionIndex].marks;
    }

    nextBtn.classList.remove("hidden");
  }

  function showResult() {
    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreDisplay.textContent = `You Marks is ${score} out of ${totalMarks}`;
  }

  function restart() {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add("hidden");
    startQuiz();
  }
});
