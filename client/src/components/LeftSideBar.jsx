import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import { Home, Search, TrendingUp, MessageCircle, Heart, PlaySquare, LogOut } from "lucide-react"
import { Avatar, AvatarFallback } from  "./ui/avatar"
import { AvatarImage } from  "@radix-ui/react-avatar"

const sidebarItems = [
    {icon: <Home/>, text:"Home"},
    {icon: <Search/>, text:"Search"},
    {icon: <TrendingUp/>, text:"Explore"},
    {icon: <MessageCircle/>, text:"Messages"},
    {icon: <Heart/>, text:"Notifications"},
    {icon: <PlaySquare/>, text:"Create"},
    {
        icon: (
            <Avatar>
                <AvatarImage src="" alt="shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        ),
        text:"Profile"
    },
    {icon: <LogOut/>, text: "Logout"},
]

const LeftSideBar = () => {
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await 
            axios.get('http://localhost:5000/api/auth/logout', 
            {withCredentials:true}
            );
            if(res.data.success){
                navigate("login");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const sidebarHandler = (textType) => {
        if(textType === 'Logout') logoutHandler();
    }


    return(
        <div className="fixed top-0 z-10 left-0 px-4 border-r border-gray-300 w-[16%] h-screen">
            <div className="flex flex-col">
                <h1>LOGO</h1>

                {
                    sidebarItems.map((item,index) => {
                        return(
                            <div onClick={() => sidebarItems(item.text)} key={index}>
                                {item.icon}
                                <span>{item.text}</span>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default LeftSideBar;