import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const QuizScoreChart = ({ score }) => {
    return (
        <div style={{width: 150, height: 150}}>
            <CircularProgressbar
                value={score}
                maxValue={100}
                text={`${score}%`}
                styles={buildStyles({
                    textColor: '#00af6b',
                    pathColor: '#098453',
                    trailColor: '#d6d6d6',
                })}
            />
        </div>
    );
};

export default QuizScoreChart;