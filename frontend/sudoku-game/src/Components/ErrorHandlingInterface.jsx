import React from 'react';
import '../Styles/ErrorHandlingInterface.css';

const ErrorHandlingInterface = ({ errorMessage }) => {
    return (
        <div className={`error-container ${errorMessage ? 'show' : ''}`}>
            {errorMessage && (
                <p className="error-message">
                     {errorMessage}
                </p>
            )}
        </div>
    );
};

export default ErrorHandlingInterface;


