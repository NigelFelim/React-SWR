/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Dialog from "../../../components/Dialog";
import { Controller, RegisterOptions, useForm } from "react-hook-form";
import CreateOrUpdatePostModel from "../../../model/posts/CreateOrUpdatePostModel";
import { GetPostsListModelData } from "../../../model/posts/GetPostsListModel";

interface Props {
    dialogTitle: string;
    open: boolean;
    onSubmit: (data: CreateOrUpdatePostModel) => any;
    onClose: () => void
    data?: GetPostsListModelData;
}

const PostForm: React.FC<Props> = (props) => {
    const { handleSubmit, control, reset } = useForm<CreateOrUpdatePostModel>();
    
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

    const bodyRules: RegisterOptions = {
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

    const onSubmit = (formData: CreateOrUpdatePostModel) => {
        props.onSubmit(formData);
        reset();
    }

    return (
        <Dialog open={props.open} dialogTitle={props.dialogTitle}>
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
                <Controller
                    name="body"
                    control={control}
                    rules={bodyRules}
                    defaultValue={props.data ? props.data.body : ""}
                    render={({ field, fieldState }) => (
                        <div className="mb-5">
                            <input { ...field } type="text" placeholder="Body" className="w-full py-2 px-4 rounded-lg appearance-none shadow border focus:outline-none focus:shadow-inputFocus focus:border-blueFocus focus:outline-2"/>
                            {
                                fieldState.error &&
                                    <p className="text-red-500 text-sm ml-2 mt-1">{fieldState.error.message}</p>
                            }
                        </div>
                    )}
                />
                <div className="flex items-center justify-content w-full gap-3">
                    <button type="button" onClick={() => onClose()} className="w-full text-red-500 border-none outline outline-1 outline-red-500 hover:border-none hover:outline-red-500 hover:outline-1">Cancel</button>
                    <button type="submit" className="w-full bg-green-700 text-white">Submit</button>
                </div>
            </form>
        </Dialog>
    );
}

export default PostForm;