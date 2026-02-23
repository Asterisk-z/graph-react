
export interface Node {
    id: string;
    title: string;
    description?: string;
    tags?: string[];
}

export interface Edge {
    id: string;
    from: string;
    to: string;
    relationship: string;
}

export interface GraphState {
    nodes: Node[];
    edges: Edge[];
}
