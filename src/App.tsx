import React, { useEffect, useState } from 'react';
import type { GraphState } from './utils/graphHelpers';
import { loadGraph, saveGraph } from './utils/localStorage';

import GraphCanvas from './components/GraphCanvas';
import NodeCard from './components/NodeCard';
import AddEditNodeForm from './components/AddEditNodeForm';
import AddEditEdgeForm from './components/AddEditEdgeForm';
import UndoRedoControls from './components/UndoRedoControls';
import ImportExport from './components/ImportExport';

import './App.css';

const App: React.FC = () => {
    const [graph, setGraph] = useState<GraphState>({ nodes: [], edges: [] });
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
    const [showNodeForm, setShowNodeForm] = useState(false);
    const [showEdgeForm, setShowEdgeForm] = useState(false);
    const [history, setHistory] = useState<GraphState[]>([]);
    const [currentIndex, setCurrentIndex] = useState(-1);

    useEffect(() => {
        loadGraph().then((data) => {
            setGraph(data);
            pushHistory(data);
        });
    }, []);

    const pushHistory = (newGraph: GraphState) => {
        const updatedHistory = [...history.slice(0, currentIndex + 1), newGraph];
        setHistory(updatedHistory);
        setCurrentIndex(updatedHistory.length - 1);
    };

    const updateGraph = (newGraph: GraphState) => {
        setGraph(newGraph);
        saveGraph(newGraph);
        pushHistory(newGraph);
    };

    const selectedNode = graph.nodes.find(n => n.id === selectedNodeId) || null;

    return (
        <div className="font-[Arial,sans-serif] p-4 bg-gray-50 min-h-screen text-gray-800">
            <h1 className="text-3xl font-semibold mb-4">Personal Knowledge Graph</h1>

            {/* Toolbar */}
            <div className="flex flex-nowrap items-center gap-3 px-4 py-3 mb-4 border-b border-gray-200 bg-[#fafafa] overflow-x-auto scrollbar-thin scrollbar-thumb-black/20">
                <button
                    onClick={() => setShowNodeForm(true)}
                    className="flex-shrink-0 whitespace-nowrap px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white border-none rounded-md text-sm font-medium cursor-pointer transition-colors duration-200"
                >
                    Add Node
                </button>
                <button
                    onClick={() => setShowEdgeForm(true)}
                    className="flex-shrink-0 whitespace-nowrap px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white border-none rounded-md text-sm font-medium cursor-pointer transition-colors duration-200"
                >
                    Add Edge
                </button>
                <UndoRedoControls
                    history={history}
                    currentIndex={currentIndex}
                    setGraph={updateGraph}
                    setCurrentIndex={setCurrentIndex}
                />
                <ImportExport graph={graph} setGraph={updateGraph} />
            </div>

            {/* Main layout */}
            <div className="flex flex-col md:flex-row gap-4">
                {/* Graph canvas */}
                <div className="flex-1 h-[600px] overflow-auto border border-gray-200 rounded-md bg-white shadow-sm [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:bg-black/20 [&::-webkit-scrollbar-thumb]:rounded">
                    <GraphCanvas
                        nodes={graph.nodes}
                        edges={graph.edges}
                        onSelectNode={setSelectedNodeId}
                    />
                </div>

                {/* Sidebar */}
                <div className="w-full md:w-[300px] bg-white border-l border-gray-200 p-4 shadow-[0_0_5px_rgba(0,0,0,0.05)] overflow-y-auto">
                    <NodeCard node={selectedNode} />
                </div>
            </div>

            {/* Node form modal */}
            {showNodeForm && (
                <AddEditNodeForm
                    node={selectedNode || undefined}
                    onSave={(node) => {
                        const newNodes = graph.nodes.find(n => n.id === node.id)
                            ? graph.nodes.map(n => (n.id === node.id ? node : n))
                            : [...graph.nodes, node];
                        updateGraph({ ...graph, nodes: newNodes });
                    }}
                    onClose={() => setShowNodeForm(false)}
                />
            )}

            {/* Edge form modal */}
            {showEdgeForm && (
                <AddEditEdgeForm
                    graph={graph}
                    onSave={(edge) => {
                        const newEdges = graph.edges.find(e => e.id === edge.id)
                            ? graph.edges.map(e => (e.id === edge.id ? edge : e))
                            : [...graph.edges, edge];
                        updateGraph({ ...graph, edges: newEdges });
                    }}
                    onClose={() => setShowEdgeForm(false)}
                />
            )}
        </div>
    );
};

export default App;