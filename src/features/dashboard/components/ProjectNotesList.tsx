import React from "react";

const ProjectNotesList: React.FC = () => {
    const notesList: string[] = [
        "This project is NOT for public use",
        "This project was created to test SWR (Stale-While-Revalidate) to help achieve an optimistic UI rendering",
        "Every data on this project is saved locally on 'db.json' file and the initial data is obtained from 'https://jsonplaceholder.typicode.com'"
    ];

    return (
        <div>
            <p className="text-xl font-bold">Project Overview</p>
            <ul className="list-disc px-5 pt-3 pb-10">
                {
                    notesList.map((item, index) => 
                        <li key={index}>
                            {item}
                        </li>
                    )
                }
            </ul>
        </div>
    );
}

export default ProjectNotesList;