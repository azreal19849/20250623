let quizData = [];
let currentIndex = 0;

fetch("questions.txt")
  .then(response => response.text())
  .then(text => {
    const lines = text.trim().split("\n");
    quizData = lines.map(line => {
      const [question, correct, choicesStr] = line.split("|");
      return {
        question,
        correct,
        choices: choicesStr.split(",")
      };
    });
    loadQuestion();
  });

function loadQuestion() {
  const q = quizData[currentIndex];
  document.getElementById("question").textContent = q.question;

  const choicesContainer = document.getElementById("choices");
  choicesContainer.innerHTML = "";

  const shuffled = [...q.choices].sort(() => Math.random() - 0.5);

  shuffled.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.onclick = () => checkAnswer(choice);
    choicesContainer.appendChild(btn);
  });

  document.getElementById("result").textContent = "";
}

function checkAnswer(choice) {
  const correct = quizData[currentIndex].correct;
  const result = document.getElementById("result");
  result.textContent = (choice === correct) ? "✅ 정답입니다!" : `❌ 오답입니다 (정답: ${correct})`;
}

document.getElementById("next-btn").onclick = () => {
  currentIndex = (currentIndex + 1) % quizData.length;
  loadQuestion();
};
