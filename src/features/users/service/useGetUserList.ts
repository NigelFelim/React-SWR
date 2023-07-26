/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { UserListModelData } from "../../../model/user/UserListModel";
import { AssignUserZonaProvider } from "../../../dataProvider/UserProvider";

const useGetUserList = () => {
    const [userData, setUserData] = useState<UserListModelData[]>([]);
    const [userLoading, setUserLoading] = useState<boolean>(false);
    const [userError, setUserError] = useState<any>(null);

    const getUserList = async (page: number) => {
        try {
            setUserError(null);
            setUserLoading(true);

            const result = await AssignUserZonaProvider.getUserList(page);

            setUserData(result.data);

            setUserLoading(false);

            return Promise.resolve(result.data);
        } catch (error) {
            setUserLoading(false);
            setUserError(error);
            return Promise.reject(error);
        }
    }

    return { getUserList, userData, userLoading, userError }
}

export default useGetUserList;