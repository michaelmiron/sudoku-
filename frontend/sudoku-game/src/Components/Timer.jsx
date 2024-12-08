import React, { useState, useEffect } from 'react';
import '../Styles/Timer.css';

const Timer = ({ reset }) => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(true);

    useEffect(() => {
        let timer;
        if (isRunning) {
            timer = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        } else {
            clearInterval(timer);
        }

        return () => clearInterval(timer);
    }, [isRunning]);

    useEffect(() => {
        setTime(0);
        setIsRunning(true);
    }, [reset]);

    const formatTime = (seconds) => {
        const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        return `${minutes}:${secs}`;
    };

    return (
        <div className="timer-container">
            <div className="timer-display">
                {formatTime(time)}
            </div>
            <div className="timer-buttons">
                <button
                    className="btn timer-button pause"
                    onClick={() => setIsRunning(!isRunning)}
                >
                    <i className={`bi ${isRunning ? 'bi-pause-fill' : 'bi-play-fill'}`}></i>
                    {isRunning ? 'Pause' : 'Resume'}
                </button>
                <button
                    className="btn timer-button reset"
                    onClick={() => setTime(0)}
                >
                    <i className="bi bi-arrow-clockwise"></i> Reset
                </button>
            </div>
        </div>
    );
};

export default Timer;
