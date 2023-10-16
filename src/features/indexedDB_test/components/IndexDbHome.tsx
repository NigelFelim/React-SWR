import React, { useEffect, useState } from "react";
import ToDoModel from "../models/ToDoModel";
import { dexieDbService } from "../services/dexieDbService";
import TodoCard from "./TodoCard";
import Alert from "../../../components/Alert";
import SuccessAlert from "../../../components/SuccessAlert";
import TodoForm from "./TodoForm";
import ToDoAddModel from "../models/ToDoAddModel";

const IndexDbHome: React.FC = () => {
    const [todoData, setToDoData] = useState<ToDoModel[]>([]);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [openFailedAlert, setOpenFailedAlert] = useState<boolean>(false);
    const [openSuccessAlert, setOpenSuccessAlert] = useState<boolean>(false);

    useEffect(() => {
        getToDoData();
        getSpecficTodo();
    }, [])

    const getToDoData = async () => {
        const data = await dexieDbService.getAllTodo()
        setToDoData(data)
    }

    const addNewTodo = (newData: ToDoAddModel) => {
        dexieDbService.addTodo(newData)
            .then(() => {
                getToDoData()
                setOpenDialog(false);
                setOpenSuccessAlert(true);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    const getSpecficTodo = async () => {
        const datas = await dexieDbService.getSpecificTodo()
        console.log("MANTAP ", datas)
    }

    const deleteSpecificTodo = (id: number) => {
        dexieDbService.deleteTodo(id)
            .then(() => {
                getToDoData()
                setOpenDialog(false);
                setOpenSuccessAlert(true);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    const updateSpecificTodo = (id: number, data: ToDoAddModel) => {
        dexieDbService.updateTodo(id, data)
            .then(() => {
                getToDoData()
                setOpenDialog(false);
                setOpenSuccessAlert(true);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    const handleBulkDelete = () => {
        dexieDbService.bulkDelete()
            .then(() => {
                getToDoData()
                setOpenDialog(false);
                setOpenSuccessAlert(true);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    // const handleClearTable = () => {
    //     dexieDbService.clearTable()
    //         .then(() => {
    //             getToDoData()
    //             setOpenDialog(false);
    //             setOpenSuccessAlert(true);
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //         });
    // }

    return (
        <div>
            <div className="p-10">
                <p className="text-4xl font-bold mb-9">To Do Page</p>
                <div className="flex flex-row-reverse w-full mb-7 gap-3">
                {/* <button className="bg-blue-800 text-white" onClick={handleClearTable}>Clear Table</button> */}
                    <button className="bg-blue-800 text-white" onClick={handleBulkDelete}>Delete Bulk</button>
                    <button className="bg-blue-800 text-white" onClick={() => setOpenDialog(true)}>Add New To Do</button>
                </div>
                <div className="overflow-auto h-[62vh]">
                    {
                        todoData && todoData.length > 0 && todoData.map((item, index) => 
                            <TodoCard key={index} data={item} onDelete={deleteSpecificTodo} onSubmitUpdate={updateSpecificTodo} />
                        )
                    }
                </div>
            </div>

            <TodoForm dialogTitle="Tambah To Do Baru" open={openDialog} onClose={() => setOpenDialog(false)} onSubmit={addNewTodo} />

            <Alert open={openFailedAlert} handleClose={() => setOpenFailedAlert(false)} title="Gagal" content="Gagal Menambahkan Data" />

            <SuccessAlert open={openSuccessAlert} handleClose={() => setOpenSuccessAlert(false)} title="Berhasil" content="Berhasil Menambahkan Data" />
        </div>
    );
}

export default IndexDbHome;