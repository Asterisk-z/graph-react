import React from 'react';
import type { Node } from '../utils/graphHelpers';

interface Props {
    node: Node | null;
}

const NodeCard: React.FC<Props> = ({ node }) => {
    if (!node) {
        return (
            <div className="p-4 text-gray-500 italic text-center">
                Select a node to view details
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] p-4 mb-4 text-gray-900">
            <h2 className="text-xl font-bold mb-2 text-gray-900">{node.title}</h2>

            {node.description && (
                <p className="mt-2 text-gray-700 text-[0.95rem]">{node.description}</p>
            )}

            {node.tags && (
                <div className="mt-2 flex flex-wrap gap-2">
                    {node.tags.map(tag => (
                        <span
                            key={tag}
                            className="px-2 py-1 bg-blue-200 text-blue-800 rounded-full text-xs font-medium"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NodeCard;