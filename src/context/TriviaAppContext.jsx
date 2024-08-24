import {createContext, useCallback, useContext, useState} from "react";
import axios from "axios";

export const TriviaAppContext = createContext()

export const TriviaAppProvider = ({children}) => {
    const [category, setCategory] = useState('any');
    const [difficulty, setDifficulty] = useState('any');
    const [showQuiz, setShowQuiz] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [score, setScore] = useState(0);


    const handleCategory = (val) => {
        setCategory(() => val)
    }

    const handleDifficulty = (val) => {
        setDifficulty(() => val)
    }

    const fetchTriviaData = useCallback(async () => {
        setLoading(true);

        try {
            const params = {
                amount: 10,
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

    const handleAnswerOptionClick = (isCorrect) => {
        if (isCorrect) {
            setScore(prevState => prevState + 1);
        }
        console.log(score)
    };

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
            handleAnswerOptionClick
        }}>
            {children}
        </TriviaAppContext.Provider>
    )
}

export const useTriviaApp = () => useContext(TriviaAppContext)