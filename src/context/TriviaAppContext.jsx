import {createContext, useCallback, useContext, useEffect, useState} from "react";
import axios from "axios";

export const TriviaAppContext = createContext()

export const TriviaAppProvider = ({children}) => {
    const [category, setCategory] = useState('any');
    const [difficulty, setDifficulty] = useState('any');
    const [showQuiz, setShowQuiz] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([])
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
    const [isTimeUp, setIsTimeUp] = useState(false);

    useEffect(() => {
        if (!loading && !error) {
            // This effect runs when loading is complete and there is no error
            if (timeLeft > 0) {
                const timerId = setInterval(() => {
                    setTimeLeft(prevTime => prevTime - 1);
                }, 1000);
                return () => clearInterval(timerId);
            } else {
                setIsTimeUp(true);
                setShowScore(true);
            }
        }
    }, [loading, error, timeLeft, setTimeLeft, setIsTimeUp, setShowScore]);

    const handleCategory = (val) => setCategory(() => val)
    const handleDifficulty = (val) => setDifficulty(() => val)

    const fetchTriviaData = useCallback(async () => {
        setLoading(true);

        try {
            const params = {
                amount: 5,
                type: 'multiple',
            }

            if (category !== "any") {
                params.category = category
            }

            if (difficulty !== "any") {
                params.difficulty = difficulty
            }

            const response = await axios.get('https://opentdb.com/api.php', {params});
            setData(response.data.results)
            setAnswers(Array(response.data.results.length).fill(null))
            setError(null)
        } catch (e) {
            setError(e);
            setData([])
        } finally {
            setLoading(false);
        }
    }, [category, difficulty]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowQuiz(true)
        await fetchTriviaData(category, difficulty)
    }

    const handleAnswerOptionClick = (answer) => {
        const updatedAnswers = [...answers]
        updatedAnswers[currentQuestionIndex] = answer
        setAnswers(updatedAnswers)

        if (answer === data[currentQuestionIndex].correct_answer) {
            setScore(prevState => prevState + 1)
        }
    };

    const handleNext = () => {
        const nextQuestion = currentQuestionIndex + 1;
        if (nextQuestion < data.length) {
            setCurrentQuestionIndex(nextQuestion);
        } else {
            setShowScore(true);
        }
        // setCurrentQuestionIndex((prevIndex) => Math.min(prevIndex + 1, data.length - 1));
    };

    const handlePrevious = () => {
        setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const resetQuiz = () => {
        handleCategory('any')
        handleDifficulty('any')
        setShowQuiz(false)
        setData([])
        setCurrentQuestionIndex(0)
        setAnswers([])
        setScore(0)
        setShowScore(false)
        setTimeLeft(300)
        setIsTimeUp(false)
    }

    return (
        <TriviaAppContext.Provider value={{
            category,
            difficulty,
            showQuiz,
            data,
            loading,
            error,
            handleCategory,
            handleDifficulty,
            handleSubmit,
            handleNext,
            handlePrevious,
            currentQuestionIndex,
            answers,
            handleAnswerOptionClick,
            score,
            setShowScore,
            showScore,
            setTimeLeft,
            timeLeft,
            setIsTimeUp,
            isTimeUp,
            resetQuiz
        }}>
            {children}
        </TriviaAppContext.Provider>
    )
}

export const useTriviaApp = () => useContext(TriviaAppContext)