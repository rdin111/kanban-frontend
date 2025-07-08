import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
// Add IColumn and update the import path
import type { IBoard, ITask, IColumn, PaginatedBoardsResult } from '../types';
import { fetchBoards, createBoardThunk, fetchBoardById } from './boardThunks';

interface BoardState {
    boards: IBoard[];
    currentBoard: IBoard | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: BoardState = {
    boards: [],
    currentBoard: null,
    status: 'idle',
    error: null,
};

const boardSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {
        addTaskToColumn: (state, action: PayloadAction<{ task: ITask; columnId: string }>) => {
            const { task, columnId } = action.payload;
            if (state.currentBoard) {
                const column = state.currentBoard.columns.find(c => c._id === columnId);
                if (column) {
                    column.tasks.push(task);
                }
            }
        },
        updateTaskInColumn: (state, action: PayloadAction<{ task: ITask }>) => {
            const { task: updatedTask } = action.payload;
            if (state.currentBoard) {
                for (const column of state.currentBoard.columns) {
                    const taskIndex = column.tasks.findIndex(t => t._id === updatedTask._id);
                    if (taskIndex !== -1) {
                        column.tasks[taskIndex] = updatedTask;
                        break;
                    }
                }
            }
        },
        removeTaskFromColumn: (state, action: PayloadAction<{ taskId: string; columnId: string }>) => {
            const { taskId, columnId } = action.payload;
            if (state.currentBoard) {
                const column = state.currentBoard.columns.find(c => c._id === columnId);
                if (column) {
                    column.tasks = column.tasks.filter(t => t._id !== taskId);
                }
            }
        },
        moveTaskInBoard: (state, action: PayloadAction<{ taskId: string, sourceColumnId: string, destColumnId: string, destIndex: number }>) => {
            const { taskId, sourceColumnId, destColumnId, destIndex } = action.payload;
            if (!state.currentBoard) return;
            const sourceColumn = state.currentBoard.columns.find(c => c._id === sourceColumnId);
            if (!sourceColumn) return;
            const taskIndex = sourceColumn.tasks.findIndex(t => t._id === taskId);
            if (taskIndex === -1) return;
            const [movedTask] = sourceColumn.tasks.splice(taskIndex, 1);
            if (destColumnId === sourceColumnId) {
                sourceColumn.tasks.splice(destIndex, 0, movedTask);
            } else {
                const destColumn = state.currentBoard.columns.find(c => c._id === destColumnId);
                if (destColumn) {
                    destColumn.tasks.splice(destIndex, 0, movedTask);
                }
            }
        },
        // This reducer is no longer strictly necessary if you refetch the board,
        // but it's good practice to keep it for potential future optimizations.
        addColumnToBoard: (state, action: PayloadAction<{ newColumn: IColumn }>) => {
            if (state.currentBoard) {
                state.currentBoard.columns.push(action.payload.newColumn);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBoards.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBoards.fulfilled, (state, action: PayloadAction<PaginatedBoardsResult>) => {
                state.status = 'succeeded';
                state.boards = action.payload.boards;
            })
            .addCase(fetchBoards.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch boards';
            })
            .addCase(createBoardThunk.fulfilled, (state, action: PayloadAction<IBoard>) => {
                state.boards.unshift(action.payload);
            })
            .addCase(fetchBoardById.pending, (state) => {
                state.status = 'loading';
                state.currentBoard = null;
            })
            .addCase(fetchBoardById.fulfilled, (state, action: PayloadAction<IBoard>) => {
                state.status = 'succeeded';
                state.currentBoard = action.payload;
            })
            .addCase(fetchBoardById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch board';
            });
    },
});

export const {
    addTaskToColumn,
    updateTaskInColumn,
    removeTaskFromColumn,
    moveTaskInBoard,
    addColumnToBoard,
} = boardSlice.actions;

export default boardSlice.reducer;