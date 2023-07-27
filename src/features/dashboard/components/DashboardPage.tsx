import React from "react";
import ProjectNotesList from "./ProjectNotesList";
import { useNavigate } from "react-router-dom";

const DashboardPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="p-10">
            <ProjectNotesList />
            <div className="flex items-center justify-between gap-10">
                <div onClick={() => navigate("/posts")} className="w-full h-[350px] bg-postBg bg-cover border border-solid shadow-2xl cursor-pointer rounded-md">
                    <div className="flex items-center justify-center h-full bg-black bg-opacity-70">
                        <p className="text-white font-bold text-4xl px-3 text-center">Post List Page</p>
                    </div>
                </div>
                <div onClick={() => navigate("/todos")} className="w-full h-[350px] bg-todoBg bg-cover border border-solid shadow-2xl cursor-pointer rounded-md">
                    <div className="flex items-center justify-center h-full bg-black bg-opacity-70">
                        <p className="text-white font-bold text-4xl px-3 text-center">To Do List Page</p>
                    </div>
                </div>
            </div>
            <div onClick={() => navigate("/posts-infinity")} className="my-4 w-full h-[350px] bg-userBg bg-cover border border-solid shadow-2xl cursor-pointer rounded-md">
                <div className="flex items-center justify-center h-full bg-black bg-opacity-70">
                    <p className="text-white font-bold text-4xl px-3 text-center">Post Infinite List Page</p>
                </div>
            </div>
            <div onClick={() => navigate("/conditional-fetch")} className="my-4 w-full h-[350px] bg-userBg bg-cover border border-solid shadow-2xl cursor-pointer rounded-md">
                <div className="flex items-center justify-center h-full bg-black bg-opacity-70">
                    <p className="text-white font-bold text-4xl px-3 text-center">Conditional Fetch Page</p>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;