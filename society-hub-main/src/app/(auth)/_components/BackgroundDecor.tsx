'use client';

import React from 'react';

export default function BackgroundDecor() {
    return (
        <>
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-100 blur-[120px] rounded-full animate-pulse-slow"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-sky-100 blur-[100px] rounded-full animate-pulse-slow animation-delay-1000"></div>
            <div className="absolute top-[20%] left-[15%] w-64 h-64 bg-purple-100 blur-[80px] rounded-full opacity-30 animate-pulse-slow animation-delay-2000"></div>
            <div className="absolute bottom-[30%] right-[20%] w-72 h-72 bg-amber-100 blur-[90px] rounded-full opacity-20 animate-pulse-slow animation-delay-3000"></div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cGF0aCBkPSJNMCAwaDQwdjQwSDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTAgMjBoNDBNMjAgMHY0ME0wIDQwaDQwTTQwIDB2NDAiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1vcGFjaXR5PSIwLjAyIi8+PC9zdmc+')] opacity-20"></div>
        </>
    );
}