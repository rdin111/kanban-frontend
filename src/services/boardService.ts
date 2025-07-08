// src/services/boardService.ts

import api from './api';
import type { IBoard, PaginatedBoardsResult,IColumn  } from '../types';

// Fetches a paginated list of boards
export const getBoards = async (page = 1, limit = 10): Promise<PaginatedBoardsResult> => {
    const { data } = await api.get('/boards', { params: { page, limit } });
    return data;
};

// Creates a new board
export const createBoard = async (name: string): Promise<IBoard> => {
    const { data } = await api.post('/boards', { name });
    return data;
};

// Fetches a single board by its ID
export const getBoardById = async (boardId: string): Promise<IBoard> => {
    const { data } = await api.get(`/boards/${boardId}`);
    return data;
};

// Deletes all tasks in a specific column
export const clearColumn = async (boardId: string, columnId: string): Promise<void> => {
    await api.delete(`/boards/${boardId}/columns/${columnId}/tasks`);
};

export const addColumn = async (boardId: string, name: string): Promise<IColumn> => {
    const { data } = await api.post(`/boards/${boardId}/columns`, { name });
    return data;
};

export const deleteColumn = async (boardId: string, columnId: string): Promise<void> => {
    await api.delete(`/boards/${boardId}/columns/${columnId}`);
};
