const quizData = [
  {
    question: "가는 말이 ○○○ ○○ 온다",
    correct: "고와야",
    choices: ["예쁘게", "고와야", "빨라야", "멀리서"]
  },
  {
    question: "호랑이도 ○○○ ○○ 한다",
    correct: "제 말 하면",
    choices: ["제 말 하면", "화를 내면", "뛰면", "웃으면"]
  },
  {
    question: "말 한마디에 ○○ ○○도 갚는다",
    correct: "천 냥 빚",
    choices: ["한 냥", "천 냥 빚", "은혜", "도토리"]
  },
  {
    question: "등잔 밑이 ○○○○",
    correct: "어둡다",
    choices: ["어둡다", "밝다", "좋다", "안보인다"]
  }
];

let currentIndex = 0;

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

window.onload = loadQuestion;
