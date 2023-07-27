import React, { useState } from "react";
import useGetPostsListDropdown from "../../posts/services/useGetPostsListDropdown";
import useSWR from "swr";

const ConditionalFetchPage: React.FC = () => {
    const [fetchDropdown, setFetchDropdown] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>("");
    
    const { getPostsListDataDropdown } = useGetPostsListDropdown();

    const { data: dropdownData } = useSWR(fetchDropdown ? `/posts?q=${searchValue}` : null, () => getPostsListDataDropdown(searchValue));

    return (
        <div className="p-10">
            <div className="flex gap-3 items-center">
                <button type="button" className="bg-blue-800 text-white" onClick={() => setFetchDropdown(!fetchDropdown)}>Test Conditional</button>
                <p>
                    {
                        fetchDropdown ? "Dropdown Data Fetched" : "Dropdown Data Not Fetched"
                    }
                </p>
            </div>
            <div>
                <input placeholder="Search" onChange={(e) => setSearchValue(e.target.value)} className="w-full my-3 py-2 px-4 rounded-lg appearance-none shadow border focus:outline-none focus:shadow-inputFocus focus:border-blueFocus focus:outline-2" />
                <select className="w-full h-12 px-2 mb-3 border-solid border border-slate-950 rounded-lg">
                    {
                        !dropdownData || dropdownData.length === 0 &&
                        <option hidden disabled selected> -- Data Tidak Ditemukan -- </option>
                    }
                    {
                        dropdownData && dropdownData.length > 0 && dropdownData.map((item, index) => 
                            <option key={index} value={item.title}>{item.title}</option>
                        )
                    }
                </select>
            </div>
        </div>
    );
}

export default ConditionalFetchPage;