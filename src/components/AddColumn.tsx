// src/components/AddColumn.tsx

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useAppDispatch } from '../redux/hooks';
import { addColumnThunk } from '../redux/boardThunks';

type AddColumnProps = {
    boardId: string;
};

function AddColumn({ boardId }: AddColumnProps) {
    const [isAdding, setIsAdding] = useState(false);
    const [name, setName] = useState('');
    const dispatch = useAppDispatch();

    const handleAddColumn = async (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            try {
                // Dispatch the thunk to add the column and refetch the board
                await dispatch(addColumnThunk({ boardId, name }));
                setName('');
                setIsAdding(false);
            } catch (error) {
                console.error("Failed to add column", error);
            }
        }
    };

    if (!isAdding) {
        return (
            <button
                onClick={() => setIsAdding(true)}
                className="btn btn-ghost bg-base-100/40 w-80 flex-shrink-0"
            >
                <Plus className="h-4 w-4" /> Add another column
            </button>
        );
    }

    return (
        <div className="bg-base-200 p-2 rounded-lg w-80 flex-shrink-0">
            <form onSubmit={handleAddColumn}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter column title..."
                    className="input input-bordered w-full"
                    autoFocus
                />
                <div className="flex items-center gap-2 mt-2">
                    <button type="submit" className="btn btn-primary">Add column</button>
                    <button type="button" onClick={() => setIsAdding(false)} className="btn btn-ghost btn-circle">
                        <X className="h-5 w-5" />
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddColumn;