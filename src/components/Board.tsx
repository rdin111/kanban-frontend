import {
    DndContext,
    PointerSensor,
    KeyboardSensor,
    useSensor,
    useSensors,
    DragOverlay,
} from '@dnd-kit/core';
import { useBoardDnd } from '../hooks/useBoardDnd';
import Column from './Column';
import TaskCard from './TaskCard';
import AddColumn from './AddColumn';
import type { IBoard } from '../types';

type BoardProps = {
    board: IBoard;
};

function Board({ board }: BoardProps) {
    const { activeTask, handleDragStart, handleDragEnd } = useBoardDnd(board);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor)
    );

    return (
        <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="flex-grow">
                <div className="flex flex-wrap gap-4 h-full items-start">
                    {board.columns.map(column => (
                        <Column key={column._id} column={column} boardId={board._id} />
                    ))}
                    <AddColumn boardId={board._id} />
                </div>
            </div>
            <DragOverlay>
                {activeTask ? <TaskCard task={activeTask} isOverlay /> : null}
            </DragOverlay>
        </DndContext>
    );
}

export default Board;