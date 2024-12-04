import React from 'react';
import '../Styles/SudokuBoard.css'; // Import the styles for the cell

const SudokuCell = ({ cell, rowIndex, colIndex, handleInputChange }) => {
    // Determine if this cell is at the edge of a 3x3 sub-grid
    const isSubGridLeft = colIndex % 3 === 0; // Every 3rd column marks the start of a sub-grid
    const isSubGridTop = rowIndex % 3 === 0; // Every 3rd row marks the start of a sub-grid
    const isSubGridRight = (colIndex + 1) % 3 === 0; // Last column of each sub-grid
    const isSubGridBottom = (rowIndex + 1) % 3 === 0; // Last row of each sub-grid

    return (
        <div
            className={`sudoku-cell ${isSubGridLeft ? 'subgrid-left' : ''} ${
                isSubGridTop ? 'subgrid-top' : ''
            } ${isSubGridRight ? 'subgrid-right' : ''} ${
                isSubGridBottom ? 'subgrid-bottom' : ''
            }`}
        >
            {cell === '' ? (
                <input
                    className="cell-input"
                    type="text"
                    maxLength="1"
                    onChange={(e) =>
                        handleInputChange(rowIndex, colIndex, e.target.value)
                    }
                />
            ) : (
                cell /* Display the value of the cell */
            )}
        </div>
    );
};

export default SudokuCell;
