import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-gray-800">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-orange-600 mb-4">404</h1>
                <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
                <p className="text-lg text-gray-600 mb-6">
                    Sorry, the page you are looking for does not exist or has been moved.
                </p>
                <Link
                    to="/"
                    className="bg-orange-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-orange-700 transition"
                >
                    Go to Homepage
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
