// src/types/index.ts

export interface ITask {
    _id: string;
    title: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
}

export interface IColumn {
    _id: string;
    name: string;
    tasks: ITask[];
}

export interface IBoard {
    _id: string;
    name: string;
    user: string; // User ID
    columns: IColumn[];
    isPublic: boolean;
    publicId?: string;
    createdAt: string;
    updatedAt: string;
}

export interface IUser {
    _id: string;
    googleId: string;
    name: string;
    email: string;
}

export interface PaginatedBoardsResult {
    boards: IBoard[];
    total: number;
    page: number;
    limit: number;
}
