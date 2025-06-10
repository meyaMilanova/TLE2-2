import React from 'react';

function BackButton({ onClick }) {
    return (
        <button
            className="absolute top-6 left-6 bg-orange-500 rounded-full w-16 h-16 flex items-center justify-center text-white text-3xl"
            onClick={onClick}
            type="button"
        >
            <span className="font-bold">&#8592;</span>
        </button>
    );
}

export default BackButton;