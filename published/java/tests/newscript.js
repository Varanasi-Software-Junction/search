document.addEventListener("DOMContentLoaded", function() {
    fetch("oops.json")
        .then(response => response.json())
        .then(quizData => loadQuiz(quizData))
        .catch(error => console.error("Error loading JSON:", error));
});

function loadQuiz(quizData) {
    const container = document.getElementById("quiz-container");
    quizData.forEach((q, index) => {
        let questionHTML = `
            <div class="question-box">
                <h5>Q${index + 1}: ${q.question}</h5>
                ${q.code ? q.code : ""}
                <div class="options">
                    ${q.options.map((option, i) => `
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="q${index}" id="q${index}o${i}" value="${i}">
                            <label class="form-check-label" for="q${index}o${i}">${option}</label>
                        </div>
                    `).join("")}
                </div>
                <button class="btn btn-primary btn-sm mt-2" onclick="checkAnswer(${index}, ${q.answer})">Check Answer</button>
                <p id="result${index}" class="mt-2"></p>
            </div>
        `;
        container.innerHTML += questionHTML;
    });

    // Apply Prism.js highlighting
    Prism.highlightAll();
}

function checkAnswer(qIndex, correctAnswer) {
    const selectedOption = document.querySelector(`input[name="q${qIndex}"]:checked`);
    const result = document.getElementById(`result${qIndex}`);

    if (selectedOption) {
        const selectedValue = parseInt(selectedOption.value);
        if (selectedValue === correctAnswer) {
            result.innerHTML = "Correct ✅";
            result.className = "correct";
        } else {
            result.innerHTML = "Incorrect ❌<br>Correct answer: " + quizData[qIndex].options[correctAnswer] +
                "<br><strong>Explanation:</strong> " + quizData[qIndex].explanation;
            result.className = "incorrect";
        }
    } else {
        result.innerHTML = "Please select an answer!";
        result.className = "text-warning";
    }
}
