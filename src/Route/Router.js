import { createBrowserRouter } from "react-router-dom";


import Main from "../layout/Main";
import About from "../pages/About/About";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/login/login/Login";
import Register from "../pages/login/Register/Register";
import Media from "../pages/media/Media";
import Profile from "../pages/profile/Profile";
import UpdateInfo from "../pages/UpdateInfo/UpdateInfo";
import PrivateRoute from "./Privateroute/PrivateRoute";
export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Media></Media>
            },
            {
                path: '/message',
                element: <PrivateRoute><Home></Home></PrivateRoute>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/about',
                element: <PrivateRoute>
                    <About></About>
                </PrivateRoute>
            },
            {
                path: '/profile',
                element: <Profile></Profile>
            },
            {
                path: '/update-info/:id',
                loader: ({ params }) => fetch(`https://friends-media-server.vercel.app/update-info/${params.id}`),
                element: <UpdateInfo></UpdateInfo>
            }
        ]
    }
])