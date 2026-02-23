import React, { useState } from 'react';
import type { Edge, GraphState } from '../utils/graphHelpers';

interface Props {
    graph: GraphState;
    edge?: Edge;
    onSave: (edge: Edge) => void;
    onClose: () => void;
}

const AddEditEdgeForm: React.FC<Props> = ({ graph, edge, onSave, onClose }) => {
    const [from, setFrom] = useState(edge?.from || graph.nodes[0]?.id || '');
    const [to, setTo] = useState(edge?.to || graph.nodes[1]?.id || '');
    const [relationship, setRelationship] = useState(edge?.relationship || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (from === to) {
            alert("From and To cannot be the same node");
            return;
        }
        onSave({
            id: edge?.id || Date.now().toString(),
            from,
            to,
            relationship
        });
        onClose();
    };

    const selectClasses =
        "w-full px-2 py-2 mb-3 border border-gray-300 rounded-md text-sm transition duration-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200";

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.2)] w-[350px] max-w-[90%] flex flex-col animate-[slideIn_0.3s_ease-out]"
            >
                <h2 className="text-xl font-bold mb-4 text-gray-900 text-center">
                    {edge ? 'Edit Edge' : 'Add Edge'}
                </h2>

                <label htmlFor="fromSelect" className="text-sm mb-1 text-gray-700">From:</label>
                <select
                    id="fromSelect"
                    value={from}
                    onChange={e => setFrom(e.target.value)}
                    className={selectClasses}
                >
                    {graph.nodes.map(n => (
                        <option key={n.id} value={n.id}>{n.title}</option>
                    ))}
                </select>

                <label htmlFor="toSelect" className="text-sm mb-1 text-gray-700">To:</label>
                <select
                    id="toSelect"
                    value={to}
                    onChange={e => setTo(e.target.value)}
                    className={selectClasses}
                >
                    {graph.nodes.map(n => (
                        <option key={n.id} value={n.id}>{n.title}</option>
                    ))}
                </select>

                <label htmlFor="relationshipInput" className="text-sm mb-1 text-gray-700">Relationship:</label>
                <input
                    id="relationshipInput"
                    type="text"
                    value={relationship}
                    onChange={e => setRelationship(e.target.value)}
                    placeholder="Relationship"
                    required
                    className={selectClasses}
                />

                <div className="flex justify-end gap-2 mt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-[0.9rem] py-[0.35rem] rounded-md border border-gray-300 bg-white cursor-pointer transition-colors duration-200 hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-[0.9rem] py-[0.35rem] rounded-md border-none bg-blue-500 text-white cursor-pointer transition-colors duration-200 hover:bg-blue-600"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddEditEdgeForm;