// src/pages/DashboardPage.tsx

import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react'; // Import the icon
import Navbar from '../components/Navbar';
import CreateBoardModal from '../components/CreateBoardModal';
import BoardList from '../components/BoardList';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchBoards, createBoardThunk } from '../redux/boardThunks';

function DashboardPage() {
    const dispatch = useAppDispatch();
    const { boards, status, error } = useAppSelector((state) => state.boards);
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchBoards());
        }
    }, [status, dispatch]);

    const handleCreateBoard = async (name: string) => {
        await dispatch(createBoardThunk(name));
        setModalOpen(false);
    };

    let content;
    if (status === 'loading') {
        content = <div className="flex justify-center p-8"><span className="loading loading-lg"></span></div>;
    } else if (status === 'succeeded') {
        content = <BoardList boards={boards} />;
    } else if (status === 'failed') {
        content = <p className="text-error text-center">{error}</p>;
    }

    return (
        <div>
            <Navbar />
            <main className="p-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Your Boards</h1>
                    <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
                        <Plus className="h-4 w-4" /> {/* Add the icon here */}
                        Create New Board
                    </button>
                </div>
                {content}
            </main>
            <CreateBoardModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleCreateBoard}
            />
        </div>
    );
}

export default DashboardPage;