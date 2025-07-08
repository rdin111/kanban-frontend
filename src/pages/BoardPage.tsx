import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchBoardById } from '../redux/boardThunks';
import { initSocket, disconnectSocket, joinBoard } from '../services/socketService';
import Navbar from '../components/Navbar';
import Board from '../components/Board';

function BoardPage() {
    const { boardId } = useParams<{ boardId: string }>();
    const dispatch = useAppDispatch();
    const { currentBoard, status, error } = useAppSelector((state) => state.boards);

    useEffect(() => {
        initSocket();
        if (boardId) {
            dispatch(fetchBoardById(boardId));
            joinBoard(boardId);
        }
        return () => {
            disconnectSocket();
        };
    }, [boardId, dispatch]);

    let content;
    if (status === 'loading' && !currentBoard) {
        content = <div className="flex justify-center items-center h-full"><span className="loading loading-lg"></span></div>;
    } else if ((status === 'succeeded' || status === 'idle') && currentBoard) {
        content = <Board board={currentBoard} />;
    } else if (status === 'failed') {
        content = <p className="text-error">{error}</p>;
    }

    return (
        // Replace bg-gray-200 with bg-base-200
        <div className='min-h-screen flex flex-col bg-base-200'>
            <Navbar />
            <main className="flex-grow flex flex-col p-4 overflow-y-auto">
                <h1 className="text-3xl font-bold mb-4 flex-shrink-0">{currentBoard?.name}</h1>
                {content}
            </main>
        </div>
    );
}

export default BoardPage;