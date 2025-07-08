import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    getBoards,
    createBoard,
    getBoardById,
    clearColumn,
    addColumn,
    deleteColumn
} from '../services/boardService';

// This is the thunk we will dispatch from other thunks.
// It does not need to be imported within this file.
export const fetchBoardById = createAsyncThunk(
    'boards/fetchBoardById',
    async (boardId: string) => {
        const board = await getBoardById(boardId);
        return board;
    }
);

export const fetchBoards = createAsyncThunk('boards/fetchBoards', async () => {
    const response = await getBoards();
    return response;
});

export const createBoardThunk = createAsyncThunk(
    'boards/createBoard',
    async (name: string) => {
        const newBoard = await createBoard(name);
        return newBoard;
    }
);

export const clearColumnThunk = createAsyncThunk(
    'boards/clearColumn',
    async ({ boardId, columnId }: { boardId: string; columnId: string }, { dispatch }) => {
        await clearColumn(boardId, columnId);
        // Dispatch the fetchBoardById thunk directly.
        dispatch(fetchBoardById(boardId));
    }
);

export const addColumnThunk = createAsyncThunk(
    'boards/addColumn',
    async ({ boardId, name }: { boardId: string; name: string }, { dispatch }) => {
        await addColumn(boardId, name);
        // Dispatch the fetchBoardById thunk directly.
        dispatch(fetchBoardById(boardId));
    }
);

export const deleteColumnThunk = createAsyncThunk(
    'boards/deleteColumn',
    async ({ boardId, columnId }: { boardId: string; columnId: string }, { dispatch }) => {
        await deleteColumn(boardId, columnId);
        // Dispatch the fetchBoardById thunk directly.
        dispatch(fetchBoardById(boardId));
    }
);