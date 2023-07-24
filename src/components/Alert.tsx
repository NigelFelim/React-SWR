import React, { useEffect } from "react";
import { MdClose } from "react-icons/md";

interface Props {
    open: boolean;
    handleClose: () => void;
}

const Alert: React.FC<Props> = (props) => {
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
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex justify-between items-center" role="alert">
                <div>
                    <strong className="font-bold">Holy smokes!</strong>
                    <span className="block sm:inline">Something seriously bad happened.</span>
                </div>
                <MdClose className="cursor-pointer" onClick={props.handleClose} />
            </div>
        </div> : null
    );
}

export default Alert;