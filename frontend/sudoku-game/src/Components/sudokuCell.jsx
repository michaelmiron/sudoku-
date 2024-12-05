import React from 'react';
import '../Styles/SudokuCells.css';


const renderCellContent = (cell, rowIndex, colIndex, handleInputChange) => {
    if (cell === '') {
        return (
            <input
                className="cell-input"
                type="text"
                maxLength="1"
                onChange={(e) =>
                    handleInputChange(rowIndex, colIndex, e.target.value)
                }
            />
        );
    }
    return cell;
};

const SudokuCell = ({ cell, rowIndex, colIndex, handleInputChange }) => {
    return (
        <div className="sudoku-cell">
            {renderCellContent(cell, rowIndex, colIndex, handleInputChange)}
        </div>
    );
};

export default SudokuCell;
