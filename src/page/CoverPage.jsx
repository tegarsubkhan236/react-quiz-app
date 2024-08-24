import {Button, Card, Col, FloatingLabel, Form, Image, Row} from "react-bootstrap";
import Cover from "../assets/img/cover.svg";
import {useTriviaApp} from "../context/TriviaAppContext.jsx";
import trivia_category from "../assets/json/trivia_category.json"
import trivia_difficulty from "../assets/json/trivia_difficulty.json"

const CoverPage = () => {
    const { category, difficulty, handleCategory, handleDifficulty, handleSubmit } = useTriviaApp()

    return (
        <Card>
            <Card.Body className="p-5">
                <Image
                    src={Cover}
                    className="mx-auto d-block"
                    style={{width: '21rem', height: '21rem'}}
                />
                <Card.Title className="text-center">Welcome to Quiz</Card.Title>
                <Card.Text className="text-center">
                    Take our quiz! Pick a category, answer multiple-choice questions, and see
                    how much you know!
                </Card.Text>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <FloatingLabel controlId="triviaCategory" label="Trivia Category">
                                <Form.Select
                                    aria-label="triviaCategory label"
                                    value={category}
                                    onChange={(e) => handleCategory(e.target.value)}
                                >
                                    {trivia_category.map((item) => (
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    ))}
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                        <Col md={6}>
                            <FloatingLabel controlId="triviaDifficulty" label="Trivia Difficulty">
                                <Form.Select
                                    aria-label="triviaDifficulty label"
                                    value={difficulty}
                                    onChange={(e) => handleDifficulty(e.target.value)}
                                >
                                    {trivia_difficulty.map((item) => (
                                        <option key={item.value} value={item.value}>{item.label}</option>
                                    ))}
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                        <Col md={12} className="d-flex justify-content-center pt-3">
                            <Button variant="purple" type="submit">Start Your Quiz</Button>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default CoverPage;