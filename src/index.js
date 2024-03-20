import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';
import App from './App';
import {QuizProvider} from "./context/QuizContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
     <React.StrictMode>
       <QuizProvider>
         <App/>
       </QuizProvider>
     </React.StrictMode>
);

