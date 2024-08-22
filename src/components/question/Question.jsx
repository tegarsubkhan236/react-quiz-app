const Question = ({ question, onAnswerClick }) => {
    const shuffledAnswers = [...question.incorrect_answers, question.correct_answer]
        .sort(() => Math.random() - 0.5)

    return (
        <div className="question-container">
            <div className="question-text">{question.question}</div>
            <div className="answer-section">
                {shuffledAnswers.map((answer, index) => (
                    <button
                        key={index}
                        onClick={() => onAnswerClick(answer === question.correct_answer)}
                    >
                        {answer}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Question;