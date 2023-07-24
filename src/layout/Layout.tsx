import React from "react";
import { Outlet } from "react-router-dom";
import Appbar from "./Appbar";

const Layout: React.FC = () => {
    return (
        <div>
            <Appbar />
            <Outlet />
        </div>
    );
}

export default Layout;