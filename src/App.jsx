import {Col, Container, Row} from "react-bootstrap";
import {useTriviaApp} from "./context/TriviaAppContext.jsx";
import CoverPage from "./page/CoverPage.jsx";
import QuizPage from "./page/QuizPage.jsx";
import ScorePage from "./page/ScorePage.jsx";

function App() {
    const { showQuiz, showScore } = useTriviaApp()

    return (
        <Container fluid>
            <Row>
                <Col sm={12} md={12} lg={{span: 6, offset: 3}}>
                    {!showQuiz
                        ? <CoverPage/>
                        : !showScore
                            ? <QuizPage/>
                            : <ScorePage/>
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default App
