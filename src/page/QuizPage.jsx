import {useMemo} from "react";
import {useTriviaApp} from "../context/TriviaAppContext.jsx";
import {Button, Card, Col, Image, ListGroup, ProgressBar, Row, Stack} from "react-bootstrap";
import Logo from "../assets/img/logo.png"
import {Clock} from "react-bootstrap-icons";
import trivia_category from "../assets/json/trivia_category.json"
import trivia_difficulty from "../assets/json/trivia_difficulty.json"
import Loading from "../components/Loading.jsx";
import Error from "../components/Error.jsx";

const QuizPage = () => {
    const {
        data,
        loading,
        error,
        category,
        difficulty,
        handleNext,
        handlePrevious,
        currentQuestionIndex,
        answers,
        handleAnswerOptionClick,
        timeLeft
    } = useTriviaApp()

    const shuffledAnswers = useMemo(() => {
        if (!data.length || !data[currentQuestionIndex]) return [];
        const currentQuestion = data[currentQuestionIndex];
        return [...currentQuestion.incorrect_answers, currentQuestion.correct_answer]
            .sort(() => Math.random() - 0.5);
    }, [data, currentQuestionIndex]);

    const selectedCategory = trivia_category.find(item => (item.id) === parseInt(category))?.name || "Any Category";
    const selectedDifficulty = trivia_difficulty.find(item => item.value === difficulty)?.label || "Any Difficulty";

    if (loading) return <Loading/>

    if (error) return <Error error={error}/>

    const currentQuestion = data[currentQuestionIndex];
    const selectedAnswer = answers[currentQuestionIndex];

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <Card>
            <Card.Body className="p-3">
                <Row>
                    <Col md={9}>
                        <Stack direction="horizontal">
                            <Image src={Logo}/>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Category : <b>{selectedCategory}</b></ListGroup.Item>
                                <ListGroup.Item>Difficulty : <b>{selectedDifficulty}</b></ListGroup.Item>
                            </ListGroup>
                        </Stack>
                    </Col>
                    <Col md={3} className="d-flex justify-content-end">
                        <Stack direction="horizontal" gap={1}>
                            <Clock color="red"/>
                            <Card.Text style={{color: 'red'}}>
                                {`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
                            </Card.Text>
                        </Stack>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col md={6}>
                        <Card.Text>Exam Progress</Card.Text>
                    </Col>
                    <Col md={6} className="d-flex justify-content-end">
                        <Card.Text>{`Question ${currentQuestionIndex + 1} out of ${data.length}`}</Card.Text>
                    </Col>
                    <Col md={12}>
                        <ProgressBar variant="success" animated now={(currentQuestionIndex + 1) / data.length * 100}/>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col md={12}>
                        <Card.Subtitle className="text-muted">{`Question ${currentQuestionIndex + 1}`}</Card.Subtitle>
                        <Card.Text as={"h5"} dangerouslySetInnerHTML={{__html: currentQuestion.question}}/>
                    </Col>
                </Row>
                <Row className="pt-3">
                    <Col md={12}>
                        <ListGroup>
                            {shuffledAnswers.map((answer, i) => (
                                <ListGroup.Item
                                    key={i}
                                    action
                                    onClick={() => handleAnswerOptionClick(answer)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="form-check">
                                        <input className="form-check-input"
                                               type="radio"
                                               name={`question-${currentQuestionIndex}`}
                                               id={`answer-${i}`}
                                               checked={selectedAnswer === answer}
                                               onChange={() => handleAnswerOptionClick(answer)}
                                        />
                                        <label className="form-check-label"
                                               htmlFor={`answer-${i}`}
                                        >
                                            <p dangerouslySetInnerHTML={{__html: answer}}/>
                                        </label>
                                    </div>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                </Row>
                <Row className="pt-3">
                    <Col md={6}>
                        {currentQuestionIndex !== 0 && (
                            <Button variant="purple" onClick={handlePrevious}>
                                Previous
                            </Button>
                        )}
                    </Col>
                    <Col md={6} className="d-flex justify-content-end">
                        <Button variant="purple" onClick={handleNext}>
                            {currentQuestionIndex !== data.length - 1 ? "Next" : "Submit"}
                        </Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default QuizPage;