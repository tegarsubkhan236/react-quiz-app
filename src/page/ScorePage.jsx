import { useTriviaApp } from "../context/TriviaAppContext.jsx";
import { Button, Card } from "react-bootstrap";
import QuizScoreChart from "../components/QuizScoreChart.jsx";

const ScorePage = () => {
    const { data, score, isTimeUp, resetQuiz } = useTriviaApp();

    const passingScore = 60;
    const currentScore =  Math.round((score / data.length) * 100);
    const isPassed = currentScore >= passingScore;

    if (isTimeUp) {
        return (
            <Card>
                <Card.Body className="p-5">
                    <Card.Title className="text-center pt-2">⏰ Time Up!</Card.Title>
                    <div className="text-center">
                        <QuizScoreChart score={currentScore} />
                    </div>
                    <Card.Text className="text-center">
                        Unfortunately, you ran out of time. Click Try Again to return to the quiz page.
                    </Card.Text>
                    <div className="d-grid">
                        <Button variant="purple" size="sm" onClick={resetQuiz}>Try Again</Button>
                    </div>
                </Card.Body>
            </Card>
        );
    } else if (isPassed) {
        return (
            <Card>
                <Card.Body className="p-5">
                    <Card.Title className="text-center pt-2 pb-3">🎉 Congratulations. You passed!</Card.Title>
                    <div className="text-center">
                        <QuizScoreChart score={currentScore}/>
                    </div>
                    <Card.Text className="text-center pt-3">
                        You have successfully completed the quiz. Click Finish to return to the quiz page.
                    </Card.Text>
                    <div className="d-grid">
                        <Button variant="purple" size="sm" onClick={resetQuiz}>Finish</Button>
                    </div>
                </Card.Body>
            </Card>
        );
    } else {
        return (
            <Card>
                <Card.Body className="p-5">
                    <Card.Title className="text-center pt-2 pb-3">😔 Unfortunately, you did not pass.</Card.Title>
                    <div className="d-flex justify-content-center">
                        <QuizScoreChart score={currentScore}/>
                    </div>
                    <Card.Text className="text-center pt-3">
                        You did not achieve the required score to pass. Click Try Again to return to the quiz page.
                    </Card.Text>
                    <div className="d-grid">
                        <Button variant="purple" size="sm" onClick={resetQuiz}>Try Again</Button>
                    </div>
                </Card.Body>
            </Card>
        );
    }
};

export default ScorePage;