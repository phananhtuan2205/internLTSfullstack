import UserHome from "./ComponentUser/UserHome"
import Home from "./ComponentUser/Home"
import AboutUs from "./ComponentUser/AboutUs"
import Shop from "./ComponentUser/Shop"
import Blog from "./ComponentUser/Blog"
import Contact from "./ComponentUser/Contact"
import Product from './ComponentAdmin/Product';
import LoginAdmin from './Layout/LoginAdmin'
import AdminLayout from "./ComponentAdmin/AdminLayout"
import Page403 from "./ComponentAdmin/Page403"
import NotfoundPage from "./Layout/NotfoundPage"
import InformationAcc from "./ComponentAdmin/InformationAcc"
import AddPro from "./ComponentAdmin/AddPro"
import UpdatePro from "./ComponentAdmin/UpdatePro"
import Cart from "./ComponentUser/Cart"
import ProductDetail from "./ComponentUser/ProductDetail"
import Register from "./ComponentUser/register"
import Login from "./ComponentUser/Login"
import Checkout from "./ComponentUser/Checkout"
let routes =[
    {
        path:"/",
        element: <UserHome/>,
        children    :[
            {
                index:true,
                element: <Home />
            },
            {
                path:'/about', element:<AboutUs/>
            },
            {
                path:'/shop', element:<Shop/>
            },
            {
                path:"/blog", element:<Blog/>
            },{
                path:"/contact", element:<Contact/>
            }
            ,{
                path:"/cart", element:<Cart/>
            },
            {
                path:"/productdetail/:id" ,element:<ProductDetail/>
            },{
                path:"/register",element:<Register/>
            },{
                path:"/loginUser",element:<Login/>
            },{
                path:"/checkout",element:<Checkout/>
            }
        ]

    },
    {
        path:"/admin",
        element:<AdminLayout/> ,
        children:[
            {
                index:true,
                element: <Product />
            },
            {
                path:"Product",
                element:<Product/>
            },
            {
                path:"information",
                element:<InformationAcc/>
            },{
                path:"Addproduct",
                element:<AddPro/>
            },{
                 path:"Updateproduct/:id",
                element:<UpdatePro/>
            }
            
        ]
    },{
        path:"/loginAdmin",
        element:<LoginAdmin/>
    },{
        path:"/*",
        element:<NotfoundPage/>

    },{
        path:"/noneauth",
        element:<Page403/>
    }
]

export default routes;