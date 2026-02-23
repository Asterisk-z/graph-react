import React, { useState } from 'react';
import type { Node } from '../utils/graphHelpers';

interface Props {
    node?: Node;
    onSave: (node: Node) => void;
    onClose: () => void;
}

const inputClasses =
    "w-full px-2 py-2 mb-2 border border-gray-300 rounded-md text-sm transition-colors duration-200 focus:outline-none focus:border-blue-500";

const AddEditNodeForm: React.FC<Props> = ({ node, onSave, onClose }) => {
    const [title, setTitle] = useState(node?.title || '');
    const [description, setDescription] = useState(node?.description || '');
    const [tags, setTags] = useState(node?.tags?.join(', ') || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            id: node?.id || Date.now().toString(),
            title,
            description,
            tags: tags.split(',').map(t => t.trim())
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.2)] w-[320px] max-w-[90%] flex flex-col animate-slideIn"
            >
                <h2 className="text-xl font-bold mb-4 text-gray-900">
                    {node ? 'Edit Node' : 'Add Node'}
                </h2>

                <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Title"
                    required
                    className={inputClasses}
                />

                <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Description"
                    className={`${inputClasses} min-h-[80px] resize-y`}
                />

                <input
                    type="text"
                    value={tags}
                    onChange={e => setTags(e.target.value)}
                    placeholder="Tags (comma separated)"
                    className={inputClasses}
                />

                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-[0.8rem] py-[0.3rem] rounded-md border border-gray-300 bg-white cursor-pointer transition-colors duration-200 hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-[0.8rem] py-[0.3rem] rounded-md border-none bg-blue-500 text-white cursor-pointer transition-colors duration-200 hover:bg-blue-600"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddEditNodeForm;