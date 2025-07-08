/**
 * Represents a single task item.
 */
export interface ITask {
    _id: string;
    title: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * Represents a column on the board, containing tasks.
 */
export interface IColumn {
    _id: string;
    name: string;
    tasks: ITask[];
}

/**
 * Represents a full Kanban board.
 */
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

/**
 * Represents an authenticated user.
 */
export interface IUser {
    _id: string;
    googleId: string;
    name: string;
    email: string;
    isAnonymous?: boolean;
}

/**
 * Represents the shape of the paginated API response for boards.
 */
export interface PaginatedBoardsResult {
    boards: IBoard[];
    total: number;
    page: number;
    limit: number;
}