import React from "react";

const Appbar: React.FC = () => {
    return (
        <div className="h-[50px] w-full bg-blue-500 sticky top-0 z-50 flex items-center justify-center">
            <p className="text-center text-white font-bold text-2xl">Welcome to SWR Test for Optimistic UI Rendering</p>
        </div>
    );
}

export default Appbar;