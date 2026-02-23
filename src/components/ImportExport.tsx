import React, { useRef } from "react";
import type { GraphState } from "../utils/graphHelpers";

interface Props {
    graph: GraphState;
    setGraph: (g: GraphState) => void;
}

const btnBase =
    "px-4 py-2 rounded-lg border-none text-white cursor-pointer text-sm font-medium shadow-[0_2px_6px_rgba(0,0,0,0.15)] transition-[background-color,transform] duration-200 hover:-translate-y-px";

const ImportExport: React.FC<Props> = ({ graph, setGraph }) => {
    const fileInput = useRef<HTMLInputElement | null>(null);

    const handleExport = () => {
        const dataStr = JSON.stringify(graph, null, 2);
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "knowledge_graph.json";
        a.click();
    };

    const handleImportFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const imported = JSON.parse(e.target?.result as string);
                if (!imported.nodes || !imported.edges) {
                    alert("Invalid file format. Must include nodes[] and edges[].");
                    return;
                }
                setGraph(imported);
                alert("Graph imported successfully!");
            } catch {
                alert("Error parsing JSON file.");
            }
        };
        reader.readAsText(file);
    };

    const handleReset = () => {
        if (window.confirm("Are you sure you want to reset all data?")) {
            setGraph({ nodes: [], edges: [] });
            alert("Graph reset successfully.");
        }
    };

    return (
        <div className="inline-flex gap-2">
            <button
                className={`${btnBase} bg-indigo-500 hover:bg-indigo-600`}
                onClick={() => fileInput.current?.click()}
            >
                Import JSON
            </button>
            <input
                type="file"
                ref={fileInput}
                className="hidden"
                accept="application/json"
                onChange={handleImportFile}
            />
            <button
                className={`${btnBase} bg-blue-500 hover:bg-blue-600`}
                onClick={handleExport}
            >
                Export JSON
            </button>
            <button
                className={`${btnBase} bg-red-500 hover:bg-red-600`}
                onClick={handleReset}
            >
                Reset
            </button>
        </div>
    );
};

export default ImportExport;