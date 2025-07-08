// src/services/taskService.ts

import api from './api';
import type { ITask } from '../types';

// --- Create Task ---
interface CreateTaskPayload {
    title: string;
    boardId: string;
    columnId: string;
}
export const createTask = async (payload: CreateTaskPayload): Promise<ITask> => {
    const { data } = await api.post('/tasks', payload);
    return data;
};

// --- Update Task ---
interface UpdateTaskPayload {
    title?: string;
    description?: string;
}
export const updateTask = async (taskId: string, payload: UpdateTaskPayload): Promise<ITask> => {
    const { data } = await api.put(`/tasks/${taskId}`, payload);
    return data;
};

// --- Delete Task ---
export const deleteTask = async (taskId: string): Promise<void> => {
    await api.delete(`/tasks/${taskId}`);
};

// --- Move Task ---
interface MoveTaskPayload {
    sourceColumnId: string;
    destColumnId: string;
    destIndex: number;
}
export const moveTask = async (taskId: string, payload: MoveTaskPayload): Promise<void> => {
    await api.put(`/tasks/${taskId}/move`, payload);
};