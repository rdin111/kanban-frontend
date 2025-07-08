// src/components/BoardList.tsx

import { useNavigate } from 'react-router-dom';
import { ArrowRight, ClipboardList } from 'lucide-react'; // Import icons
import type { IBoard } from '../types';

type BoardListProps = {
    boards: IBoard[];
};

function BoardList({ boards }: BoardListProps) {
    const navigate = useNavigate();

    if (boards.length === 0) {
        return (
            <div className="text-center py-10 text-base-content/60">
                <ClipboardList className="h-12 w-12 mx-auto mb-4" /> {/* Add icon here */}
                <p className="font-semibold">You don't have any boards yet.</p>
                <p>Click "Create New Board" to get started!</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {boards.map((board) => (
                <div key={board._id} className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">{board.name}</h2>
                        <p>You have {board.columns.length} columns.</p>
                        <div className="card-actions justify-end">
                            <button
                                className="btn btn-primary"
                                onClick={() => navigate(`/board/${board._id}`)}
                            >
                                View Board
                                <ArrowRight className="h-4 w-4" /> {/* Add icon here */}
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default BoardList;