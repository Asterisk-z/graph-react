import type { GraphState } from './graphHelpers';

const STORAGE_KEY = 'knowledgeGraph';

export const loadGraph = async (): Promise<GraphState> => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) return JSON.parse(data);

    const response = await fetch('/data/knowledge_data.json');
    if (!response.ok) throw new Error('Failed to load JSON');

    return response.json();
};

export const saveGraph = (graph: GraphState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(graph));
};
