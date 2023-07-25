import React, { useEffect } from "react";
import { MdClose } from "react-icons/md";

interface Props {
    title: string;
    content: string;
    open: boolean;
    handleClose: () => void;
}

const SuccessAlert: React.FC<Props> = (props) => {
    useEffect(() => {
        if (props.open) {
            setTimeout(() => {
                props.handleClose()
            }, 5000)
        }
    }, [props.open])

    return (
        props.open ?
        <div className="fixed inset-0 top-20 z-4 px-9 animate-fade" onClick={props.handleClose}>
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex justify-between items-center" role="alert">
                <div className="flex flex-col">
                    <strong className="font-bold">{props.title}</strong>
                    <span className="block sm:inline">{props.content}</span>
                </div>
                <MdClose className="cursor-pointer" onClick={props.handleClose} />
            </div>
        </div> : null
    );
}

export default SuccessAlert;