// src/services/socketService.ts

import { io, Socket } from 'socket.io-client';
import type { ITask } from '../types';
import { store } from '../redux/store';
import {
    addTaskToColumn,
    updateTaskInColumn,
    removeTaskFromColumn,
    moveTaskInBoard,
} from '../redux/boardSlice';

let socket: Socket;

export const initSocket = () => {
    const socketUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';
    socket = io(socketUrl);

    socket.on('connect', () => console.log('🔌 Socket connected:', socket.id));
    socket.on('disconnect', () => console.log('Socket disconnected'));

    socket.on('task:created', (data: { task: ITask, columnId: string }) => {
        store.dispatch(addTaskToColumn(data));
    });

    socket.on('task:updated', (updatedTask: ITask) => {
        store.dispatch(updateTaskInColumn({ task: updatedTask }));
    });

    socket.on('task:deleted', (data: { taskId: string, columnId: string }) => {
        store.dispatch(removeTaskFromColumn(data));
    });

    socket.on('task:moved', (data: { taskId: string, sourceColumnId: string, destColumnId: string, destIndex: number }) => {
        store.dispatch(moveTaskInBoard(data));
    });
};

export const joinBoard = (boardId: string) => {
    if (socket) socket.emit('joinBoard', boardId);
};

export const disconnectSocket = () => {
    if (socket) socket.disconnect();
};