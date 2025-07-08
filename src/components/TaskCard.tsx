// src/components/TaskCard.tsx

import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Trash2, Pencil, Check, X } from 'lucide-react';
import type { ITask } from '../types';
import { deleteTask, updateTask } from '../services/taskService';

type TaskCardProps = {
    task: ITask;
    isOverlay?: boolean;
};

function TaskCard({ task, isOverlay }: TaskCardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task._id,
        data: { type: 'Task', task },
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            await deleteTask(task._id);
        }
    };

    const handleTitleUpdate = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (title.trim() && title.trim() !== task.title) {
            await updateTask(task._id, { title });
        }
        setIsEditing(false);
    };

    const handleCancel = () => {
        setTitle(task.title);
        setIsEditing(false);
    };

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="bg-base-100 p-2 mb-2 rounded shadow-md opacity-30 border-2 border-primary"
            />
        );
    }

    const cardListeners = isOverlay ? {} : listeners;

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...cardListeners}
            className="bg-base-100 p-3 mb-2 rounded-lg shadow-sm group relative touch-none"
            onDoubleClick={() => setIsEditing(true)}
        >
            {!isEditing && (
                <div className="absolute top-1 right-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => setIsEditing(true)} className="btn btn-xs btn-ghost btn-circle">
                        <Pencil className="h-4 w-4" />
                    </button>
                    <button onClick={handleDelete} className="btn btn-xs btn-ghost btn-circle">
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            )}

            {isEditing ? (
                <form onSubmit={handleTitleUpdate} className="flex flex-col gap-2">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="input input-bordered input-sm w-full"
                        autoFocus
                    />
                    <div className="flex items-center justify-end gap-2">
                        <button type="button" onClick={handleCancel} className="btn btn-xs btn-ghost">
                            <X className="h-4 w-4" /> Cancel
                        </button>
                        <button type="submit" className="btn btn-xs btn-primary">
                            <Check className="h-4 w-4" /> Save
                        </button>
                    </div>
                </form>
            ) : (
                <p className="pr-12">{task.title}</p>
            )}
        </div>
    );
}

export default TaskCard;