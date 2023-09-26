import Header from "./Header"
import { Outlet } from "react-router-dom"
import Footer from "./Footer"
const UserHome= () =>{
    return(
        <>
            <Header></Header>
            <Outlet></Outlet>
            <Footer/>
        </>
    )
}

export default UserHome;