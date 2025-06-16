// Components/Modal.jsx
import React from "react";

function SortingModal({ isOpen, onClose, title, message }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md shadow-lg text-center">
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                <p className="mb-6">{message}</p>
                <button
                    onClick={onClose}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Begrijp ik
                </button>
            </div>
        </div>
    );
}

export default SortingModal;
