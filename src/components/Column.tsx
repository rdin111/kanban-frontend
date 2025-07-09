import { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { ListTodo, LoaderCircle, CheckCircle2, Plus, MoreHorizontal, Trash } from 'lucide-react';
import type { IColumn } from '../types';
import { useAppDispatch } from '../redux/hooks';
import { clearColumnThunk, deleteColumnThunk } from '../redux/boardThunks';
import TaskCard from './TaskCard';
import { createTask } from '../services/taskService';
import { addTaskToColumn } from '../redux/boardSlice';

const columnIcons: { [key: string]: React.ReactNode } = {
    'To Do': <ListTodo className="h-5 w-5" />,
    'In Progress': <LoaderCircle className="h-5 w-5" />,
    'Done': <CheckCircle2 className="h-5 w-5" />,
};

type ColumnProps = {
    column: IColumn;
    boardId: string;
};

function Column({ column, boardId }: ColumnProps) {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const dispatch = useAppDispatch();
    const { setNodeRef, isOver } = useDroppable({ id: column._id });

    const handleAddTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newTaskTitle.trim()) {
            try {
                const newTask = await createTask({ title: newTaskTitle, boardId, columnId: column._id });
                dispatch(addTaskToColumn({ task: newTask, columnId: column._id }));
                setNewTaskTitle('');
            } catch (error) {
                console.error("Failed to create task", error);
            }
        }
    };

    const handleClearColumn = () => {
        if(window.confirm(`Are you sure you want to delete all tasks in the "${column.name}" column?`)) {
            dispatch(clearColumnThunk({ boardId, columnId: column._id }));
        }
    }

    const handleDeleteColumn = () => {
        if(window.confirm(`Are you sure you want to delete the "${column.name}" column and all its tasks? This action cannot be undone.`)) {
            dispatch(deleteColumnThunk({ boardId, columnId: column._id }));
        }
    }

    return (
        <div
            ref={setNodeRef}
            className={`p-2 rounded-lg w-80 flex-shrink-0 flex flex-col min-h-96 transition-colors duration-200 ${
                isOver ? 'bg-base-300' : 'bg-base-100'
            }`}
        >
            <div className="flex justify-between items-center mb-2 px-2">
                <h2 className="font-bold text-lg flex items-center gap-2">
                    {columnIcons[column.name] || null}
                    {column.name}
                    <span className='text-sm font-normal text-base-content/60'>{column.tasks.length}</span>
                </h2>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-xs btn-circle"><MoreHorizontal /></label>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <a onClick={handleClearColumn}>
                                <Trash className="h-4 w-4" />
                                Clear All Tasks
                            </a>
                        </li>
                        <li>
                            <a onClick={handleDeleteColumn} className="text-error">
                                <Trash className="h-4 w-4" />
                                Delete This Column
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="overflow-y-auto flex-grow">
                <SortableContext items={column.tasks.map(t => t._id)} strategy={verticalListSortingStrategy}>
                    {column.tasks.map(task => (
                        <TaskCard key={task._id} task={task} />
                    ))}
                </SortableContext>
            </div>
            <form onSubmit={handleAddTask} className="mt-4">
                <div className="relative">
                    <Plus className="h-4 w-4 absolute top-1/2 left-3 -translate-y-1/2 text-base-content/40" />
                    <input
                        type="text"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        placeholder="Add a task"
                        className="input input-bordered w-full pl-9"
                    />
                </div>
            </form>
        </div>
    );
}

export default Column;