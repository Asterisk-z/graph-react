import React, { useEffect, useRef } from 'react';
import { DataSet, Network } from 'vis-network/standalone';
import type { Node, Edge } from '../utils/graphHelpers';

interface Props {
    nodes: Node[];
    edges: Edge[];
    onSelectNode?: (id: string) => void;
    onSelectEdge?: (id: string) => void;
}

const GraphCanvas: React.FC<Props> = ({ nodes, edges, onSelectNode, onSelectEdge }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const visNodes = new DataSet(nodes.map(item => ({
            id: item.id,
            label: item.title,
            title: item.description
        })));

        const visEdges = new DataSet(edges.map(item => ({
            id: item.id,
            from: item.from,
            to: item.to,
            label: item.relationship,
            arrows: 'to'
        })));

        const network = new Network(
            containerRef.current,
            { nodes: visNodes, edges: visEdges },
            {
                layout: { improvedLayout: true },
                physics: { enabled: true },
                interaction: { hover: true, multiselect: false }
            }
        );

        network.on('selectEdge', (params) => {
            if (onSelectEdge && params.edges.length > 0) {
                onSelectEdge(params.edges[0] as string);
            }
        });

        return () => network.destroy();

    }, [nodes, edges, onSelectNode, onSelectEdge]);

    return (
        <div
            ref={containerRef}
            className="w-full h-[700px] lg:h-[800px] border border-gray-300 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] bg-white overflow-hidden transition-[height] duration-300 ease-in-out"
        />
    );
};

export default GraphCanvas;