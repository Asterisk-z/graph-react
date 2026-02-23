import React from 'react';
import type { GraphState } from '../utils/graphHelpers';

interface Props {
    history: GraphState[];
    currentIndex: number;
    setGraph: (g: GraphState) => void;
    setCurrentIndex: (i: number) => void;
}

const UndoRedoControls: React.FC<Props> = ({ history, currentIndex, setGraph, setCurrentIndex }) => {
    const undo = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setGraph(history[currentIndex - 1]);
        }
    };

    const redo = () => {
        if (currentIndex < history.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setGraph(history[currentIndex + 1]);
        }
    };

    const btnBase = "px-3 py-1 rounded font-medium transition-colors duration-200";

    return (
        <div className="mt-2 flex gap-2">
            <button
                onClick={undo}
                disabled={currentIndex <= 0}
                className={`${btnBase} bg-gray-200 hover:bg-gray-300 disabled:opacity-40 disabled:cursor-not-allowed`}
            >
                Undo
            </button>
            <button
                onClick={redo}
                disabled={currentIndex >= history.length - 1}
                className={`${btnBase} bg-gray-200 hover:bg-gray-300 disabled:opacity-40 disabled:cursor-not-allowed`}
            >
                Redo
            </button>
        </div>
    );
};

export default UndoRedoControls;