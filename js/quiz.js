var quiz;

function showResults() {
    // Check answers and continue if all questions have been answered
    if (quiz.checkAnswers()) {
        var quizScorePercent = quiz.result.scorePercentFormatted; // The unformatted percentage is a decimal in range 0 - 1
        var quizResultElement = document.getElementById('quiz-result');
        quizResultElement.style.display = 'block';
        document.getElementById('quiz-score').innerHTML = quiz.result.score.toString();
        document.getElementById('quiz-max-score').innerHTML = quiz.result.totalQuestions.toString();
        document.getElementById('quiz-percent').innerHTML = quizScorePercent.toString();

        // Change background colour of results div according to score percent
        if (quizScorePercent === 100) quizResultElement.style.backgroundColor = '#4caf50';
        else if (quizScorePercent >= 75) quizResultElement.style.backgroundColor = '#ffc107';
        else if (quizScorePercent >= 25) quizResultElement.style.backgroundColor = '#ff9800';
        else if (quizScorePercent >= 0) quizResultElement.style.backgroundColor = '#f44336';

        // Highlight questions according to whether they were correctly answered. The callback allows us to highlight/show the correct answer
        quiz.highlightResults(handleAnswers);

        window.scrollTo(0, 0);
    }
}

/** Callback for Quiz.highlightResults. Highlights the correct answers of incorrectly answered questions
 * Parameters are: the question element, question number, correctly answered flag
 */
function handleAnswers(question, no, correct) {
    if (!correct) {
        var answers = question.getElementsByTagName('input');
        for (var i = 0; i < answers.length; i++) {
            if (answers[i].type === "checkbox" || answers[i].type === "radio"){
                // If the current input element is part of the correct answer, highlight it
                if (quiz.answers[no].indexOf(answers[i].value) > -1) {
                    answers[i].parentNode.classList.add(quiz.Classes.CORRECT);
                }
            } else {
                // If the input is anything other than a checkbox or radio button, show the correct answer next to the element
                var correctAnswer = document.createElement('span');
                correctAnswer.classList.add(quiz.Classes.CORRECT);
                correctAnswer.classList.add(quiz.Classes.TEMP); // quiz.checkAnswers will automatically remove elements with the temp class
                correctAnswer.innerHTML = quiz.answers[no];
                correctAnswer.style.marginLeft = '10px';
                answers[i].parentNode.insertBefore(correctAnswer, answers[i].nextSibling);
            }
        }
    }
}

window.onload = function() {
    quiz = new Quiz('quiz-container', [
        // Réponses correctes de chaque questions :
        'b', // -> Question 1
        'a', // -> Question 2
        'b', // -> Q3
        'a', // -> Q4
        'a', // -> Q5
        'b', // -> Q6
        ['b', 'c'], // -> Q7
        'c', // -> Q8
        'b', // -> Q9
        'c', // -> Q10
        'c', // -> Q11
        'b', // -> Q12
        ['b', 'c'], // -> Q13
        'c', // -> Q14
        ['a','c' ], // -> Q15
        'b', // -> Q16
        'c', // -> Q17
        ['a', 'c'], // -> Q18
        'c', // -> Q19
        'b', // ->20
        'b' //->21

        // Pour la dernière réponse, PAS DE VIRGULE !!
        // Si choix multiple, alors écrire la bonne réponse sous cette forme : ['b', 'c', 'd']
    ]);
};