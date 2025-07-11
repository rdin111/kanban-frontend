// src/hooks/useBoardDnd.ts

import { useState } from 'react';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import type { IBoard, ITask } from '../types';
import { moveTask } from '../services/taskService';
import { useAppDispatch } from '../redux/hooks';
import { moveTaskInBoard } from '../redux/boardSlice';

export function useBoardDnd(currentBoard: IBoard | null) {
    const [activeTask, setActiveTask] = useState<ITask | null>(null);
    const dispatch = useAppDispatch();

    function handleDragStart(event: DragStartEvent) {
        const { active } = event;
        const activeId = active.id.toString();

        if (currentBoard) {
            for (const column of currentBoard.columns) {
                const task = column.tasks.find(t => t._id === activeId);
                if (task) {
                    setActiveTask(task);
                    break;
                }
            }
        }
    }

    async function handleDragEnd(event: DragEndEvent) {
        setActiveTask(null);

        const { active, over } = event;
        if (!over || !currentBoard) return;

        const activeId = active.id.toString();
        if (active.id === over.id) return;

        const overId = over.id.toString();

        const sourceColumn = currentBoard.columns.find(col =>
            col.tasks.some(task => task._id === activeId)
        );
        if (!sourceColumn) return;

        let destColumnId = overId;
        let destIndex = 0;

        const destColumn = currentBoard.columns.find(col => col._id === overId);
        if (destColumn) {
            destColumnId = overId;
            destIndex = destColumn.tasks.length;
        } else {
            const overColumn = currentBoard.columns.find(col =>
                col.tasks.some(task => task._id === overId)
            );
            if (!overColumn) return;
            destColumnId = overColumn._id;
            destIndex = overColumn.tasks.findIndex(task => task._id === overId);
        }

        // Optimistically update the UI
        dispatch(moveTaskInBoard({
            taskId: activeId,
            sourceColumnId: sourceColumn._id,
            destColumnId,
            destIndex
        }));

        try {
            await moveTask(activeId, {
                sourceColumnId: sourceColumn._id,
                destColumnId,
                destIndex,
            });
        } catch (err) {
            console.error("Failed to move task", err);
            // Revert the UI change on error if necessary
            // This would require a more complex implementation to undo the move
        }
    }

    return {
        activeTask,
        handleDragStart,
        handleDragEnd,
    };
}