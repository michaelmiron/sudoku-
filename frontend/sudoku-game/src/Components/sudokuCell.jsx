import React from 'react';
import '../Styles/SudokuCells.css';

const renderCellContent = (cell, rowIndex, colIndex, handleInputChange) => {
    return (
        <input
            className="cell-input"
            type="text"
            maxLength="1"
            value={cell}
            onChange={(e) => {
                const value = e.target.value;
                if (value === '' || /^[1-9]$/.test(value)) {
                    handleInputChange(rowIndex, colIndex, value);
                }
            }}
        />
    );
};

const SudokuCell = ({ cell, rowIndex, colIndex, handleInputChange }) => {
    return (
        <div className="sudoku-cell">
            {renderCellContent(cell, rowIndex, colIndex, handleInputChange)}
        </div>
    );
};

export default SudokuCell;
