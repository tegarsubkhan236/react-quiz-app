import {useState} from "react";
import {useTriviaApp} from "../context/TriviaAppContext.jsx";
import {Button, Card, Col, Form, Image, ListGroup, ProgressBar, Row, Spinner, Stack} from "react-bootstrap";
import Logo from "../assets/img/logo.png"
import {Clock} from "react-bootstrap-icons";
import trivia_category from "../assets/json/trivia_category.json"
import trivia_difficulty from "../assets/json/trivia_difficulty.json"

const QuizPage = () => {
    const {data, loading, error, category, difficulty} = useTriviaApp()
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');

    const question = data[currentQuestionIndex];
    const selectedCategory = trivia_category.find(item => (item.id) === parseInt(category))?.name || "Any Category";
    const selectedDifficulty = trivia_difficulty.find(item => item.value === difficulty)?.label || "Any Difficulty";

    const handleNext = () => {
        setCurrentQuestionIndex((prevIndex) => Math.min(prevIndex + 1, data.length - 1));
    };

    const handlePrevious = () => {
        setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const handleAnswerChange = (e) => {
        setSelectedAnswer(e.target.value);
    };

    if (loading) return (
        <div className="spinner-container">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    )

    if (error) return <p>Error: {error.message}</p>

    return (
        <Card>
            <Card.Body>
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
                                00:05:55
                            </Card.Text>
                        </Stack>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Card.Text>Exam Progress</Card.Text>
                    </Col>
                    <Col md={6} className="d-flex justify-content-end">
                        <Card.Text>{`Question ${currentQuestionIndex + 1} out of ${data.length}`}</Card.Text>
                    </Col>
                    <Col md={12}>
                        <ProgressBar animated now={(currentQuestionIndex + 1) / data.length * 100} />
                    </Col>
                </Row>
                <Row className="pt-4">
                    <Col md={12}>
                        <Card.Subtitle className="text-muted">{`Question ${currentQuestionIndex + 1}`}</Card.Subtitle>
                        <Card.Text as={"h5"} dangerouslySetInnerHTML={{__html: question.question}}/>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Form>
                            {[...question.incorrect_answers, question.correct_answer].map((answer, i) => (
                                <Form.Check
                                    key={i}
                                    type="radio"
                                    id={`answer-${i}`}
                                    name="answers"
                                    value={answer}
                                    label={answer}
                                    checked={selectedAnswer === answer}
                                    onChange={handleAnswerChange}
                                />
                            ))}
                        </Form>
                    </Col>
                </Row>
                <Row className="pt-4">
                    <Col md={6}>
                        <Button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
                            Previous
                        </Button>
                    </Col>
                    <Col md={6} className="d-flex justify-content-end">
                        <Button onClick={handleNext} disabled={currentQuestionIndex === data.length - 1}>
                            Next
                        </Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default QuizPage;