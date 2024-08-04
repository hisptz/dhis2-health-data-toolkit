import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import SummaryPage from "./SummaryPage";
import classes from "./App.module.css";

const App: React.FC = () => {
    return (
        <Router>
            <div className={classes.app}>
                <Routes>
                    <Route path="/summary" element={<SummaryPage />} />
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
