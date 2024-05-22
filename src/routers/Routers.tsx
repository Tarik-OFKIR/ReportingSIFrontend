import {createBrowserRouter} from "react-router-dom";
import SignIn from "../pages/signIn/SignIn.tsx";
import HomeTest from "../pages/home/HomeTest.tsx";
import AgencyFormPage from "../pages/FormPages/agency/AgencyFormPage.tsx";
import ApplicationFormPage from "../pages/FormPages/application/ApplicationFormPage.tsx";
import StateFormPage from "../pages/FormPages/state/StateFormPage.tsx";
import BprFormPage from "../pages/FormPages/bpr/BprFormPage.tsx";
import AgentFormPage from "../pages/FormPages/Agent/AgentFormPage.tsx";
import SuccursaleFormPage from "../pages/FormPages/succursale/SuccursaleFormPage.tsx";
import Home from "../pages/home/Home.tsx";



const router = createBrowserRouter([
    {
        path: '/administration',
        element : <HomeTest/>,
    },
    {
        path: "/agence",
        element: <AgencyFormPage/>

    },
    {
        path: "/application",
        element: <ApplicationFormPage/>
    },
    {
        path: "/etat",
        element: <StateFormPage/>
    },
    {
        path: "/bpr",
        element: <BprFormPage/>
    },
    {
        path: "/agent",
        element: <AgentFormPage/>
    },
    {
        path: "/succursale",
        element: <SuccursaleFormPage/>
    },
    {
        path: "/",
        element: <SignIn />,
    },
    {
        path: "/home",
        element: <Home/>,
    }
])
export default router;