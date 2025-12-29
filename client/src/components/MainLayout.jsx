import LeftSideBar from "./LeftSideBar";

import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <div>
            <LeftSideBar />
            <div>
                <Outlet/>
            </div>
        </div>
    )
}

export default MainLayout;