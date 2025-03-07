const questionEl = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultContainer = document.getElementById("result");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;

function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    optionsContainer.innerHTML = "";

    Object.entries(currentQuestion.options).forEach(([key, value]) => {
        const btn = document.createElement("button");
        btn.classList.add("option");
        btn.textContent = value;
        btn.dataset.key = key;
        btn.addEventListener("click", () => selectOption(btn, key));
        optionsContainer.appendChild(btn);
    });

    nextBtn.disabled = true;
}

function selectOption(button, key) {
    document.querySelectorAll(".option").forEach(btn => btn.classList.remove("selected"));
    button.classList.add("selected");
    selectedAnswer = key;
    nextBtn.disabled = false;
}

function handleNext() {
    if (selectedAnswer === quizData[currentQuestionIndex].correct) {
        score++;
    }
    currentQuestionIndex++;
    
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    questionEl.style.display = "none";
    optionsContainer.style.display = "none";
    nextBtn.style.display = "none";
    resultContainer.classList.remove("hidden");
    scoreEl.textContent = `${score} / ${quizData.length}`;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;
    resultContainer.classList.add("hidden");
    questionEl.style.display = "block";
    optionsContainer.style.display = "block";
    nextBtn.style.display = "block";
    loadQuestion();
}

nextBtn.addEventListener("click", handleNext);
restartBtn.addEventListener("click", restartQuiz);

// Load first question
loadQuestion();
