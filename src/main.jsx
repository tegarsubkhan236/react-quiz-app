import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/main.css'
import {TriviaAppProvider} from "./context/TriviaAppContext.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <TriviaAppProvider>
            <App/>
        </TriviaAppProvider>
    </StrictMode>,
)
