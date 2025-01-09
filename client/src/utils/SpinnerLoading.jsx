import React from 'react';
import 'tailwindcss/tailwind.css';

const SpinnerLoading = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-orange-500"></div>
        </div>
    );
};

export default SpinnerLoading;