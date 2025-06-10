import React from 'react';

function OrangeButton({ children, className = '', ...props }) {
    return (
        <button
            className={`bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-12 rounded-full text-2xl transition-colors duration-200 font-itim ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}

export default OrangeButton;