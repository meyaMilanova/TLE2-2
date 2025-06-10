import React from 'react';

function PinkButton({ type = "button", children, ...props }) {
    return (
        <button
            type={type}
            className="bg-rozeButton text-white font-bold py-4 px-12 text-2xl rounded-full shadow-lg hover:bg-hoverButton font-itim"
            {...props}
        >
            {children}
        </button>
    );
}

export default PinkButton;