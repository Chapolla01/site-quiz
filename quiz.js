let questions = [];
let currentQuestion = 0;
let score = 0;
let correctAnswer = null;

// Carrega as perguntas de um JSON local ou simulado
async function loadQuestions() {
  // Simulei os dados para funcionar sem arquivo Excel
  const response = await fetch('questions.json'); // ou substitua com dados inline
  const data = await response.json();
  questions = shuffle(data).slice(0, 10);
  displayQuestion();
}

function displayQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("questions").innerText = q[0];
  document.getElementById("btn1").innerText = q[1];
  document.getElementById("btn2").innerText = q[2];
  document.getElementById("btn3").innerText = q[3];
  document.getElementById("btn4").innerText = q[4];
  correctAnswer = q[5];

  enableButtons(true);
}

function checkAnswer(answer) {
  if (answer === correctAnswer) {
    score++;
  }

  currentQuestion++;

  if (currentQuestion < questions.length) {
    displayQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  alert(`Parabéns! Você completou o quiz.\n\nPontuação final: ${score}/${questions.length}`);
  enableButtons(false);
  document.getElementById("playAgain").style.display = "block";
}

function playAgain() {
  score = 0;
  currentQuestion = 0;
  document.getElementById("playAgain").style.display = "none";
  questions = shuffle(questions);
  enableButtons(true);
  displayQuestion();
}

function enableButtons(enabled) {
  for (let i = 1; i <= 4; i++) {
    document.getElementById(`btn1`).disabled = !enabled;
    document.getElementById(`btn2`).disabled = !enabled;
    document.getElementById(`btn3`).disabled = !enabled;
    document.getElementById(`btn4`).disabled = !enabled;
  }
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

window.onload = loadQuestions;
