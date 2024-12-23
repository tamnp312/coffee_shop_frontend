import React from "react";
import { Badge, Avatar, Dropdown } from "antd";
import { MdNotificationsNone, MdLanguage, MdSettings } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser } from "../../../store/userSlice";
import Cookies from "js-cookie";
import { message } from "antd";


const Topbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        Cookies.remove("token");
        Cookies.remove("refreshToken");
        localStorage.removeItem("shipping-address");
        dispatch(clearUser());
        navigate("/login");
        message.success("Logout Successfully!");
      };

    const menuItems = [
        {
            key: "1",
            label: <span>Profile</span>,
        },
        {
            key: "2",
            label: <span>Settings</span>,
        },
        {
            key: "3",
            label: (
                <span
                    onClick={handleLogout}
                    className="text-red-500"
                >
                    Logout
                </span>
            ),
        },
    ];

    

    return (
        <div className="w-full h-[60px] bg-white sticky top-0 z-[999] shadow-sm">
            <div className="h-full px-5 flex items-center justify-between">
                <div className="font-bold text-2xl text-blue-700 cursor-pointer">
                    shopAdmin
                </div>
                <div className="flex items-center space-x-4">
                    <div className="relative cursor-pointer text-gray-700">
                        <Badge count={2} offset={[0, 0]}>
                            <MdNotificationsNone className="text-2xl" />
                        </Badge>
                    </div>
                    <div className="relative cursor-pointer text-gray-700">
                        <Badge count={2} offset={[0, 0]}>
                            <MdLanguage className="text-2xl" />
                        </Badge>
                    </div>
                    <div className="cursor-pointer text-gray-700">
                        <MdSettings className="text-2xl" />
                    </div>
                    <Dropdown
                        menu={{ items: menuItems }}
                        placement="bottomRight"
                        trigger={["hover"]}
                        dropdownRender={(menu) => (
                            <div className="mt-2 w-[100px]">{menu}</div>
                        )
                        }
                    >
                        <Avatar
                            size={40}
                            src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                            className="cursor-pointer"
                        />
                    </Dropdown>
                </div>
            </div>
        </div>
    );
};

export default Topbar;
