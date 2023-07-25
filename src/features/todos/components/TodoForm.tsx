/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Dialog from "../../../components/Dialog";
import { Controller, RegisterOptions, useForm } from "react-hook-form";
import { GetTodosListModelData } from "../../../model/todos/GetTodosListModel";
import CreateOrUpdateTodoModel from "../../../model/todos/CreateOrUpdateTodoModel";

interface Props {
    dialogTitle: string;
    open: boolean;
    onSubmit: (data: CreateOrUpdateTodoModel) => any;
    onClose: () => void
    data?: GetTodosListModelData;
}

const TodoForm: React.FC<Props> = (props) => {
    const { register, handleSubmit, control, reset } = useForm<CreateOrUpdateTodoModel>();
    
    const titleRules: RegisterOptions = {
        required: {
            value: true,
            message: "Required"
        },
        validate: (value) => {
            if (value.trim() === "") {
                return "Required";
            }

            return undefined;
        }
    }

    const onClose = () => {
        reset();
        props.onClose();
    }

    const onSubmit = (formData: CreateOrUpdateTodoModel) => {
        props.onSubmit(formData);
        reset();
    }

    return (
        <Dialog open={props.open} dialogTitle="Tambah To Do Baru">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="title"
                    control={control}
                    rules={titleRules}
                    defaultValue={props.data ? props.data.title : ""}
                    render={({ field, fieldState }) => (
                        <div className="mb-5">
                            <input { ...field } type="text" placeholder="Title" className="w-full py-2 px-4 rounded-lg appearance-none shadow border focus:outline-none focus:shadow-inputFocus focus:border-blueFocus focus:outline-2"/>
                            {
                                fieldState.error &&
                                    <p className="text-red-500 text-sm ml-2 mt-1">{fieldState.error.message}</p>
                            }
                        </div>
                    )}
                />
                <div className="ml-1 flex items-center gap-3 mb-5">
                    <input {...register("completed")} type="checkbox" className="rounded-sm w-4 h-4" />
                    <label>Completed</label>
                </div>
                <div className="flex items-center justify-content w-full gap-3">
                    <button type="button" onClick={() => onClose()} className="w-full text-red-500 border-none outline outline-1 outline-red-500 hover:border-none hover:outline-red-500 hover:outline-1">Cancel</button>
                    <button type="submit" className="w-full bg-green-700 text-white">Submit</button>
                </div>
            </form>
        </Dialog>
    );
}

export default TodoForm;