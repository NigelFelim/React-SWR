import React from "react";

interface Props {
    open: boolean;
    dialogTitle: string;
    children: React.ReactNode;
}

const Dialog: React.FC<Props> = (props) => {
    return (
        props.open ?
        <div className="absolute top-0 left-0 bg-black bg-opacity-50 w-screen h-screen z-[100] flex items-center justify-center">
            <div className="bg-white w-[500px] max-h-[80vh] p-5">
                <p className="font-bold text-2xl mb-8">{props.dialogTitle}</p>
                <div className="mb-2">
                    {props.children}
                </div>
            </div>
        </div>
        : null
    );
}

export default Dialog;