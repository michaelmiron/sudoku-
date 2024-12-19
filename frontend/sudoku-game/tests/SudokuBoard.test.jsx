import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, test, expect, vi } from 'vitest';
import SudokuBoard from '../src/components/SudokuBoard';


vi.mock('../src/components/SudokuCell', () => ({
    default: ({ rowIndex, colIndex, handleInputChange }) => (
        <input
            data-testid={`cell-${rowIndex}-${colIndex}`}
            onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
        />
    ),
}));

vi.mock('../src/components/ResetBoard', () => ({
    default: ({ setInitialBoard }) => (
        <button onClick={setInitialBoard} data-testid="reset-board-button">
            Reset Board
        </button>
    ),
}));

vi.mock('../src/components/SolveStepButton', () => ({
    default: () => <button data-testid="solve-step-button">Solve Step</button>,
}));

vi.mock('../src/components/Timer', () => ({
    default: ({ reset }) => <div data-testid="timer">{reset ? 'Timer Reset' : '00:00'}</div>,
}));

describe('SudokuBoard Component', () => {
    test('calls handleEndGame when End Game button is clicked', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
            json: async () => ({ success: true, game_number: 1 }),
        });

        render(<SudokuBoard />);

        const endGameButton = screen.getByText(/End Game/i);

        await act(async () => {
            fireEvent.click(endGameButton);
        });

        await waitFor(() => {
            expect(screen.getByTestId('end-game-message')).toHaveTextContent(/Game 1 saved successfully!/i);
        });

        global.fetch.mockRestore();
    });
});
