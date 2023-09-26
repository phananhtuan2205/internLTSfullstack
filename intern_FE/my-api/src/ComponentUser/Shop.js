import { useEffect, useState } from "react";
import "../Style/shop.css"
import{Row ,Col, message,Pagination }from 'antd';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addtocart } from "../features/CartSlice";
import { useSelector } from "react-redux"
const Shop = () =>{
    const [listCategory,setlistCategory] = useState([]);
    const [listProduct,setlistProduct] = useState([]);
    const [search,setSearch] = useState("");
    const [page,setpage] = useState(1);
    const [totalPage,setTotalPage] = useState();
    const [cateID,setcateID] = useState()
    const [listcart, setlistcart] = useState([])
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart)
    useEffect(()=>{
        const callapi = async()=>{
            const requestCate = await fetch(`http://localhost:8080/site/categoryall`)
            const responeCate = await requestCate.json()
            const requestProduct = await fetch(`http://localhost:8080/site/productall?name=${search}&page=${page}`)
            const responeProduct= await requestProduct.json()
            const requesttotalpage = await fetch(`http://localhost:8080/site/totalproduct?name=${search}`)
            const responseTotalpage = await requesttotalpage.json();
            console.log(responeProduct)
            setlistProduct(responeProduct)
            setlistCategory(responeCate)
            setTotalPage(Math.ceil(responseTotalpage/6)*10)
            if(cateID){
                const requestProductbycate = await fetch(`http://localhost:8080/site/productbycate?cateid=${cateID}&page=${page}`)
                const responeProductbyate = await requestProductbycate.json()
                const requesttotalpagebyecate = await fetch(`http://localhost:8080/site/totalproductbycate?cateid=${cateID}`)
                const responseTotalpagebycate = await requesttotalpagebyecate.json();
                console.log("tổng trang",responseTotalpage)
                setTotalPage(Math.ceil(responseTotalpagebycate/9)*10)
                setlistProduct(responeProductbyate)
            }
            
        }
        
        callapi()
    },[page,search,cateID])

    const productbycate = (id)=>{
        console.log(id)
        setcateID(id)
        setpage(1)
    }
    const searchproduct = async()=>{
        setpage(1)
    }
    const onChange = (pageNumber) => {
        console.log(pageNumber)
        setpage(pageNumber)
      };
    const confirm2 = (text) => {
        message.success(`Thêm thành công ${text} vào giỏ hàng`);
    };
    
        const Addtocart = (item)=>{
            
            const listcart = {
                "id":item.id,
                "nameProduct" : item.nameProduct,
                "price" : item.price,
                "discount":item.discount,
                "avartarImageProduct" : item.avartarImageProduct,
                "quantity" : 1
            }
            
            dispatch(addtocart(listcart))
            confirm2(listcart.nameProduct)
        }
      
    return(
        <div className="container">
             <div style={{backgroundColor: "#f7f7f7",width:"100%",height:"100px"}}>
                <h1 style={{fontSize: "20px",
                        fontWeight: "500",
                        textTransform: "uppercase",
                        textAlign:"center",
                        paddingTop:"40px"                        
                        }}>
                    Sản phẩm</h1>
            </div>
            <div className="body_shop">
                <Row style={{paddingTop:"20px",margin:"0% auto"}} gutter={16}>
                        <Col className="gutter-row" span={5}>
                           <div >
                                <h6>Tìm kiếm sản phẩm</h6>
                                <div className="search">
                                <div style={{alignItems:"center",height: "70px"}}>
                                    <input onChange={(e)=>{setSearch(e.target.value)}} placeholder='Nhập mã đơn hàng....'></input>
                                    <button onClick={searchproduct} style={{width:"50px"}} className='button-search'><i className="bi bi-search"></i></button>
                                </div>
                            </div>
                           </div>
                           <div style={{marginTop:"50px"}}>
                                <h6>Các loại sản phẩm</h6>
                                <ul style={{listStyle:"none",padding:"0"}}>
                                    {
                                       listCategory.map(item=>{
                                            return(
                                                <li key={item.id} ><button onClick={()=>{productbycate(item.id)}} className="searchbycate">{item.nameProductType}</button></li>
                                            )
                                       }) 
                                    }
                                </ul>
                           </div>
                        </Col>
                        <Col className="gutter-row" span={19}>
                            <Row style={{paddingTop:"20px",margin:"0% auto"}} gutter={16}>
                                {
                                   listProduct? listProduct.map(item=>{
                                        return(
                                            <Col key={item.id} className="gutter-row" span={8}>
                                                <Link style={{textDecoration:"none"}} to={`/productdetail/${item.id}`}>
                                                    <div className="image-product">
                                                        <img src={item.avartarImageProduct} width="100%" height="250px"/>
                                                        <button onClick={()=>{Addtocart(item)}} className="add-cart">
                                                            <div style={{margin:"0% auto"}}>
                                                                <i  style={{marginRight:"20px"}}className="bi bi-cart"></i>
                                                                Thêm vào giỏ hàng
                                                            </div>
                                                        </button>
                                                    </div>
                                                    <div className="product-content">
                                                        <h3 style={{fontSize: "20px",
                                                            textTransform: "uppercase",
                                                            marginBottom: "10px",color:"black"}}>
                                                                <Link style={{color:"black",textDecoration:"none"}}>{item.nameProduct}</Link>
                                                        </h3>
                                                        <div className="price">
                                                            <span>{new Intl.NumberFormat('vi-VN', {style: 'currency',currency: 'VND',}).format(item.discount)}</span>
                                                            <span className="old">{new Intl.NumberFormat('vi-VN', {style: 'currency',currency: 'VND',}).format(item.price)}</span>
                                                        </div>
                                                    </div>
                                                </Link>
                                                    
                                                </Col>
                                           
                                        )
                                    }):"No data"
                                }
                                
                                
                            </Row> 
                            <Pagination style={{marginTop:"50px"}} defaultCurrent={page} total={totalPage?totalPage:1} onChange={onChange}/>  
                        </Col> 
                    </Row>   
            </div>           
        </div>
    )
}
export default Shop