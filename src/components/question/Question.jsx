const Question = ({ question, onAnswerClick }) => {
    return (
        <div className="question-container">
            <div className="question-text">{question.question}</div>
            <div className="answer-section">
                {question.map((answer, index) => (
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