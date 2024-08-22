import { useEffect, useState } from "react";
import Question from "../question/Question.jsx";

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);

    useEffect(() => {
        const fetchQuestions = () => {
            fetch('https://opentdb.com/api.php?amount=10&type=multiple')
                .then(res => res.json())
                .then(data => setQuestions(data.results))
                .catch(error => console.error("Error fetching questions:", error));
        };

        const timeoutId = setTimeout(fetchQuestions, 1000); // delay 1 second
        return () => clearTimeout(timeoutId);
    }, []);

    const handleAnswerOptionClick = (isCorrect) => {
        if (isCorrect) {
            setScore(prevState => prevState + 1);
        }

        const nextQuestion = currentQuestionIndex + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestionIndex(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    return (
        <div className="quiz-container">
            {questions && questions.length > 0 ? (
                showScore ? (
                    <div className="score-section">You scored {score} out of {questions.length}</div>
                ) : (
                    <Question
                        question={questions[currentQuestionIndex]}
                        onAnswerClick={handleAnswerOptionClick}
                    />
                )
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default Quiz;